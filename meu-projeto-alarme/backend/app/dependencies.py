"""FastAPI dependencies for request authentication."""
import hmac

from fastapi import Header, HTTPException

from .config import settings


def verify_api_key(x_api_key: str = Header(...)) -> None:
    """Validate X-API-Key header using constant-time comparison."""
    expected = settings.alarm_api_key
    if not expected or not hmac.compare_digest(x_api_key.encode(), expected.encode()):
        raise HTTPException(status_code=403, detail="Invalid API Key")
