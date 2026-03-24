from unittest.mock import patch, MagicMock
from datetime import datetime
import pytest
from fastapi.testclient import TestClient


def _get_client():
    from backend.app.main import app
    return TestClient(app)


def test_health_endpoint():
    client = _get_client()
    resp = client.get("/health")
    assert resp.status_code == 200
    assert resp.json() == {"status": "healthy"}


def test_trigger_without_api_key_returns_403():
    client = _get_client()
    resp = client.post("/api/v1/alarm/trigger")
    assert resp.status_code in (403, 422)  # missing header → 422 or 403


def test_trigger_with_wrong_key_returns_403():
    with patch("backend.app.dependencies.settings") as mock_s:
        mock_s.alarm_api_key = "real-key"
        client = _get_client()
        resp = client.post("/api/v1/alarm/trigger", headers={"X-API-Key": "wrong-key"})
        assert resp.status_code == 403


def test_trigger_with_correct_key_returns_200():
    mock_result = MagicMock()
    mock_result.status = "ok"
    mock_result.count_calls = 3
    mock_result.slack_sent = True
    mock_result.duration_ms = 150
    mock_result.timestamp = datetime.now()
    mock_result.error = None
    mock_result.model_dump = lambda: {
        "status": "ok", "count_calls": 3, "slack_sent": True,
        "duration_ms": 150, "timestamp": mock_result.timestamp.isoformat(), "error": None
    }

    with patch("backend.app.routers.alarm.alarm_service") as mock_svc:
        with patch("backend.app.dependencies.settings") as mock_s:
            mock_s.alarm_api_key = "test-key"
            mock_svc.run.return_value = mock_result
            client = _get_client()
            resp = client.post("/api/v1/alarm/trigger", headers={"X-API-Key": "test-key"})
            assert resp.status_code == 200


def test_status_endpoint_returns_200():
    from backend.app.models import StatusResponse
    real_status = StatusResponse(
        last_execution=None,
        last_result=None,
        cooldown_active=False,
        cooldown_remaining_seconds=None,
    )
    with patch("backend.app.routers.alarm.alarm_service") as mock_svc:
        mock_svc.get_status.return_value = real_status
        client = _get_client()
        resp = client.get("/api/v1/alarm/status")
        assert resp.status_code == 200
