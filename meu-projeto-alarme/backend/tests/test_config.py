import os
import pytest
from unittest.mock import patch

def test_settings_reads_env_vars():
    env = {
        "DB_HOST": "myhost",
        "DB_PORT": "3307",
        "DB_NAME": "mydb",
        "DB_USER": "myuser",
        "DB_PASSWORD": "mypass",
        "SLACK_WEBHOOK_URL": "https://hooks.slack.com/test",
        "ALARM_API_KEY": "test-key-123",
        "ALARM_HOUR": "07h00",
        "APP_ENV": "test",
    }
    with patch.dict(os.environ, env, clear=True):
        # Re-import to pick up new env
        import importlib
        import backend.app.config as cfg_mod
        importlib.reload(cfg_mod)
        s = cfg_mod.Settings()
        assert s.db_host == "myhost"
        assert s.db_port == 3307
        assert s.alarm_hour == "07h00"
        assert s.alarm_api_key == "test-key-123"
