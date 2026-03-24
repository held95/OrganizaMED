"""Service for querying UC1 call counts from MySQL."""
import logging

from ..database import db_manager

logger = logging.getLogger(__name__)

QUERY = """
    SELECT COUNT(*) as total_calls
    FROM call_transcriptions_qa_data
    WHERE DATE(created_at) = CURDATE()
"""


def count_today_calls() -> int:
    """Return the number of UC1 calls ingested today."""
    with db_manager.get_cursor() as cursor:
        cursor.execute(QUERY)
        row = cursor.fetchone()
        count = row["total_calls"] if row else 0
        logger.info(f"count_today_calls: {count}")
        return int(count)
