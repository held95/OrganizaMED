from datetime import datetime, timedelta
from unittest.mock import patch, MagicMock
import pytest


def _reload():
    import importlib
    from backend.app.services import alarm_service
    importlib.reload(alarm_service)
    return alarm_service


def test_run_returns_ok_response():
    mod = _reload()
    mod._last_execution = None
    mod._last_result = None

    with patch("backend.app.services.alarm_service.database_service") as mock_db:
        with patch("backend.app.services.alarm_service.slack_service") as mock_slack:
            mock_db.count_today_calls.return_value = 7
            mock_slack.send_success.return_value = True

            result = mod.run()

            assert result.status == "ok"
            assert result.count_calls == 7
            assert result.slack_sent is True
            assert result.error is None


def test_run_respects_cooldown():
    from backend.app.models import AlarmResponse
    from datetime import datetime as dt

    mod = _reload()
    recent = datetime.now() - timedelta(minutes=30)
    mock_prev = AlarmResponse(
        status="ok",
        count_calls=3,
        slack_sent=True,
        duration_ms=100,
        timestamp=dt.now(),
    )
    mod._last_execution = recent
    mod._last_result = mock_prev

    with patch("backend.app.services.alarm_service.database_service") as mock_db:
        result = mod.run()
        # Should NOT hit the DB
        mock_db.count_today_calls.assert_not_called()
        assert result == mock_prev


def test_run_handles_db_error():
    mod = _reload()
    mod._last_execution = None

    with patch("backend.app.services.alarm_service.database_service") as mock_db:
        with patch("backend.app.services.alarm_service.slack_service") as mock_slack:
            mock_db.count_today_calls.side_effect = Exception("DB down")
            mock_slack.send_failure.return_value = True

            result = mod.run()

            assert result.status == "error"
            assert "DB down" in result.error
            mock_slack.send_failure.assert_called_once()


def test_get_status_reflects_cooldown():
    from backend.app.models import AlarmResponse
    from datetime import datetime as dt

    mod = _reload()
    mod._last_execution = datetime.now() - timedelta(minutes=20)
    mod._last_result = AlarmResponse(
        status="ok",
        count_calls=0,
        slack_sent=True,
        duration_ms=50,
        timestamp=dt.now(),
    )

    status = mod.get_status()
    assert status.cooldown_active is True
    assert status.cooldown_remaining_seconds > 0
