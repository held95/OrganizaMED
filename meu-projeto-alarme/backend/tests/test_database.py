from unittest.mock import MagicMock, patch
import pytest


def test_init_pool_called_once():
    """Pool should not be re-created if already initialized."""
    with patch("mysql.connector.pooling.MySQLConnectionPool") as mock_pool:
        from backend.app import database
        import importlib
        importlib.reload(database)

        database.db_manager._pool = None
        database.db_manager.init_pool()
        assert database.db_manager._pool is not None
        # Call again — should not raise or recreate
        database.db_manager.init_pool()
        assert mock_pool.call_count == 1


def test_get_connection_raises_if_pool_fails():
    from backend.app import database
    import importlib
    importlib.reload(database)

    database.db_manager._pool = None
    with patch("mysql.connector.pooling.MySQLConnectionPool", side_effect=Exception("conn failed")):
        with pytest.raises(Exception, match="conn failed"):
            database.db_manager.init_pool()
