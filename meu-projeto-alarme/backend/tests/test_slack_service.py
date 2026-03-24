from datetime import date
from unittest.mock import patch, MagicMock
import pytest


def test_send_success_returns_true_on_200():
    mock_resp = MagicMock()
    mock_resp.status_code = 200
    mock_resp.text = "ok"

    with patch("httpx.post", return_value=mock_resp):
        with patch("backend.app.services.slack_service.settings") as mock_settings:
            mock_settings.slack_webhook_url = "https://hooks.slack.com/test"
            mock_settings.alarm_hour = "06h00"
            from backend.app.services import slack_service
            import importlib
            importlib.reload(slack_service)
            result = slack_service.send_success(5)
            assert result is True


def test_send_success_returns_false_on_403():
    mock_resp = MagicMock()
    mock_resp.status_code = 403
    mock_resp.text = "invalid_token"

    with patch("httpx.post", return_value=mock_resp):
        with patch("backend.app.services.slack_service.settings") as mock_settings:
            mock_settings.slack_webhook_url = "https://hooks.slack.com/test"
            mock_settings.alarm_hour = "06h00"
            from backend.app.services import slack_service
            import importlib
            importlib.reload(slack_service)
            result = slack_service.send_success(0)
            assert result is False


def test_send_failure_returns_false_on_timeout():
    import httpx
    with patch("httpx.post", side_effect=httpx.TimeoutException("timeout")):
        with patch("backend.app.services.slack_service.settings") as mock_settings:
            mock_settings.slack_webhook_url = "https://hooks.slack.com/test"
            mock_settings.alarm_hour = "06h00"
            from backend.app.services import slack_service
            import importlib
            importlib.reload(slack_service)
            result = slack_service.send_failure("DB connection failed")
            assert result is False
