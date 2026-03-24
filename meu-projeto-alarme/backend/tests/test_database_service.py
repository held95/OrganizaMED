from unittest.mock import MagicMock, patch
import pytest


def test_count_today_calls_returns_int():
    mock_cursor = MagicMock()
    mock_cursor.fetchone.return_value = {"total_calls": 42}

    with patch("backend.app.services.database_service.db_manager") as mock_db:
        mock_db.get_cursor.return_value.__enter__ = lambda s: mock_cursor
        mock_db.get_cursor.return_value.__exit__ = MagicMock(return_value=False)

        from backend.app.services import database_service
        import importlib
        importlib.reload(database_service)

        result = database_service.count_today_calls()
        assert result == 42


def test_count_today_calls_raises_on_db_error():
    from mysql.connector import Error as MySQLError

    with patch("backend.app.services.database_service.db_manager") as mock_db:
        mock_db.get_cursor.side_effect = MySQLError("connection refused")

        from backend.app.services import database_service
        import importlib
        importlib.reload(database_service)

        with pytest.raises(Exception, match="connection refused"):
            database_service.count_today_calls()
