"""Alarm orchestration service — coordinates DB query, Slack notification, and state."""
import json
import logging
import time
from datetime import datetime, timedelta
from typing import Optional

from . import database_service, slack_service
from ..models import AlarmResponse, StatusResponse

logger = logging.getLogger(__name__)

COOLDOWN_HOURS = 1

# In-memory state (reset on process restart)
_last_execution: Optional[datetime] = None
_last_result: Optional[AlarmResponse] = None


def _is_in_cooldown() -> bool:
    if _last_execution is None:
        return False
    return (datetime.now() - _last_execution) < timedelta(hours=COOLDOWN_HOURS)


def run() -> AlarmResponse:
    """Execute the daily alarm: query DB, send Slack, return result."""
    global _last_execution, _last_result

    # Both conditions needed: cooldown time passed AND a result was cached.
    # In practice, _last_result is always set alongside _last_execution, so
    # the second condition is a safety guard against corrupted state.
    if _is_in_cooldown() and _last_result is not None:
        logger.info("Cooldown active — returning cached result")
        return _last_result

    start = time.monotonic()

    try:
        count = database_service.count_today_calls()
    except Exception as e:
        duration_ms = int((time.monotonic() - start) * 1000)
        error_msg = str(e)
        slack_sent = slack_service.send_failure(error_msg)
        result = AlarmResponse(
            status="error",
            slack_sent=slack_sent,
            duration_ms=duration_ms,
            timestamp=datetime.now(),
            error=error_msg,
        )
        _last_execution = datetime.now()
        _last_result = result
        logger.error(json.dumps({
            "event": "alarm_error",
            "error": error_msg,
            "slack_sent": slack_sent,
            "duration_ms": duration_ms,
        }))
        return result

    slack_sent = slack_service.send_success(count)
    # Note: send_success() swallows all exceptions and returns False on any failure,
    # so no try/except is needed here. State is always updated below.
    duration_ms = int((time.monotonic() - start) * 1000)

    result = AlarmResponse(
        status="ok",
        count_calls=count,
        slack_sent=slack_sent,
        duration_ms=duration_ms,
        timestamp=datetime.now(),
    )
    _last_execution = datetime.now()
    _last_result = result

    logger.info(json.dumps({
        "event": "alarm_executed",
        "count_calls": count,
        "slack_sent": slack_sent,
        "duration_ms": duration_ms,
        "timestamp": result.timestamp.isoformat(),
    }))
    return result


def get_status() -> StatusResponse:
    """Return current state: last execution time, result, and cooldown info."""
    cooldown_active = _is_in_cooldown()
    remaining = None
    if cooldown_active and _last_execution is not None:
        elapsed = (datetime.now() - _last_execution).total_seconds()
        remaining = int(COOLDOWN_HOURS * 3600 - elapsed)
    return StatusResponse(
        last_execution=_last_execution,
        last_result=_last_result,
        cooldown_active=cooldown_active,
        cooldown_remaining_seconds=remaining,
    )
