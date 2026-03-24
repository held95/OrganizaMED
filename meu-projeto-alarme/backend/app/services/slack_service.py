"""Service for sending notifications to Slack via Incoming Webhook."""
import logging
from datetime import date

import httpx

from ..config import settings

logger = logging.getLogger(__name__)

TIMEOUT = 10.0


def _post(payload: dict) -> bool:
    """POST payload to Slack webhook. Returns True on success, False otherwise."""
    try:
        resp = httpx.post(settings.slack_webhook_url, json=payload, timeout=TIMEOUT)
        if resp.status_code == 200:
            return True
        logger.warning(f"Slack returned HTTP {resp.status_code}: {resp.text}")
        return False
    except httpx.TimeoutException:
        logger.error("Slack webhook timed out")
        return False
    except Exception as e:
        logger.error(f"Slack error: {e}")
        return False


def send_success(count: int) -> bool:
    """Send success message with call count to Slack."""
    today = date.today().strftime("%Y-%m-%d")
    hour = settings.alarm_hour
    payload = {
        "text": f"O DataApp foi executado hoje às {hour} e identificou {count} novas calls.",
        "blocks": [
            {
                "type": "section",
                "text": {
                    "type": "mrkdwn",
                    "text": (
                        f":bar_chart: *Relatório Diário UC1*\n"
                        f"O DataApp foi executado hoje às {hour} e identificou *{count} novas calls*."
                    ),
                },
            },
            {
                "type": "context",
                "elements": [
                    {"type": "mrkdwn", "text": f"Data: {today} | Pipeline: UC1 | Status: Sucesso"},
                ],
            },
        ],
    }
    return _post(payload)


def send_failure(error_msg: str) -> bool:
    """Send failure notification to Slack."""
    hour = settings.alarm_hour
    payload = {
        "text": (
            f":warning: O DataApp falhou ao executar às {hour}. "
            f"Erro: {error_msg}. Verifique os logs na plataforma RapidCanvas."
        )
    }
    return _post(payload)
