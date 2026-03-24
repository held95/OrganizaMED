"""Pydantic response models for Alarm API."""
from datetime import datetime
from typing import Literal, Optional

from pydantic import BaseModel


class AlarmResponse(BaseModel):
    status: Literal["ok", "error"]
    count_calls: Optional[int] = None
    slack_sent: Optional[bool] = None
    duration_ms: int
    timestamp: datetime
    error: Optional[str] = None


class StatusResponse(BaseModel):
    last_execution: Optional[datetime] = None
    last_result: Optional[AlarmResponse] = None
    cooldown_active: bool
    cooldown_remaining_seconds: Optional[int] = None
