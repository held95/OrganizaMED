"""Service for querying UC1 call counts from MySQL."""
import logging

logger = logging.getLogger(__name__)

QUERY = """
    SELECT COUNT(*) as total_calls
    FROM call_transcriptions_qa_data
    WHERE DATE(created_at) = CURDATE()
"""

# Import db_manager only if it hasn't been set already (e.g. by a test mock).
# On first import the name doesn't exist, so we bind it from the database module.
# On reload inside a patch() context the name already exists (as the mock),
# so we leave it untouched — allowing tests to control it via patch().
try:
    db_manager  # noqa: F821 — intentional: keep existing binding if present
except NameError:
    from ..database import db_manager  # noqa: F401


def count_today_calls() -> int:
    """Return the number of UC1 calls ingested today."""
    with db_manager.get_cursor() as cursor:
        cursor.execute(QUERY)
        row = cursor.fetchone()
        count = row["total_calls"] if row else 0
        logger.info(f"count_today_calls: {count}")
        return int(count)
