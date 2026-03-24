"""MySQL connection pool management for Alarm API."""
import logging
from contextlib import contextmanager
from typing import Optional

from mysql.connector import pooling, Error as MySQLError

from .config import settings

logger = logging.getLogger(__name__)


class DatabaseManager:
    def __init__(self):
        self._pool: Optional[pooling.MySQLConnectionPool] = None

    def init_pool(self):
        if self._pool is not None:
            return
        self._pool = pooling.MySQLConnectionPool(
            pool_name="alarm_pool",
            pool_size=5,
            pool_reset_session=True,
            host=settings.db_host,
            port=settings.db_port,
            user=settings.db_user,
            password=settings.db_password,
            database=settings.db_name,
        )
        logger.info(f"DB pool initialized: {settings.db_host}:{settings.db_port}/{settings.db_name}")

    def close_pool(self):
        # Note: mysql-connector-python's MySQLConnectionPool does not expose a close()
        # method. Dropping the reference lets GC reclaim it, but open server-side
        # connections will remain until MySQL's wait_timeout (default: 8h) elapses.
        if self._pool:
            self._pool = None
            logger.info("DB pool closed")

    def get_connection(self):
        if self._pool is None:
            self.init_pool()
        return self._pool.get_connection()

    @contextmanager
    def get_cursor(self, dictionary: bool = True):
        conn = None
        cursor = None
        try:
            conn = self.get_connection()
            cursor = conn.cursor(dictionary=dictionary)
            yield cursor
            conn.commit()
        except MySQLError as e:
            if conn:
                conn.rollback()
            logger.error(f"Database error: {e}")
            raise
        except Exception as e:
            if conn:
                conn.rollback()
            logger.error(f"Unexpected database error: {e}")
            raise
        finally:
            if cursor:
                cursor.close()
            if conn:
                conn.close()


db_manager = DatabaseManager()
