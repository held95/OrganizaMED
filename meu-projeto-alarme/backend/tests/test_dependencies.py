import pytest
from unittest.mock import MagicMock, patch
from fastapi import HTTPException

import backend.app.dependencies as dependencies


def test_valid_api_key_passes():
    mock_settings = MagicMock()
    mock_settings.alarm_api_key = "correct-key"
    with patch.object(dependencies, "settings", mock_settings):
        # Should not raise
        dependencies.verify_api_key("correct-key")


def test_invalid_api_key_raises_403():
    mock_settings = MagicMock()
    mock_settings.alarm_api_key = "correct-key"
    with patch.object(dependencies, "settings", mock_settings):
        with pytest.raises(HTTPException) as exc_info:
            dependencies.verify_api_key("wrong-key")
        assert exc_info.value.status_code == 403


def test_empty_configured_key_always_raises_403():
    mock_settings = MagicMock()
    mock_settings.alarm_api_key = ""
    with patch.object(dependencies, "settings", mock_settings):
        with pytest.raises(HTTPException) as exc_info:
            dependencies.verify_api_key("")
        assert exc_info.value.status_code == 403
