import hmac
import pytest
from unittest.mock import patch
from fastapi import HTTPException


def test_valid_api_key_passes():
    with patch("backend.app.dependencies.settings") as mock_settings:
        mock_settings.alarm_api_key = "correct-key"
        from backend.app import dependencies
        import importlib
        importlib.reload(dependencies)
        # Should not raise
        dependencies.verify_api_key("correct-key")


def test_invalid_api_key_raises_403():
    with patch("backend.app.dependencies.settings") as mock_settings:
        mock_settings.alarm_api_key = "correct-key"
        from backend.app import dependencies
        import importlib
        importlib.reload(dependencies)
        with pytest.raises(HTTPException) as exc_info:
            dependencies.verify_api_key("wrong-key")
        assert exc_info.value.status_code == 403
