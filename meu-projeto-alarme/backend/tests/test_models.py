from datetime import datetime


def test_alarm_response_ok():
    from backend.app.models import AlarmResponse
    r = AlarmResponse(
        status="ok",
        count_calls=5,
        slack_sent=True,
        duration_ms=234,
        timestamp=datetime.now(),
    )
    assert r.status == "ok"
    assert r.error is None


def test_alarm_response_error():
    from backend.app.models import AlarmResponse
    r = AlarmResponse(
        status="error",
        duration_ms=100,
        timestamp=datetime.now(),
        error="DB connection failed",
    )
    assert r.count_calls is None
    assert r.error == "DB connection failed"


def test_status_response_no_execution():
    from backend.app.models import StatusResponse
    r = StatusResponse(
        last_execution=None,
        last_result=None,
        cooldown_active=False,
        cooldown_remaining_seconds=None,
    )
    assert r.cooldown_active is False
