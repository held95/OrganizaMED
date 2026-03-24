"""Alarm endpoints: /trigger and /status."""
from fastapi import APIRouter, Depends

from ..dependencies import verify_api_key
from ..models import AlarmResponse, StatusResponse
from ..services import alarm_service

router = APIRouter(prefix="/alarm", tags=["alarm"])


@router.post("/trigger", response_model=AlarmResponse)
def trigger_alarm(_: None = Depends(verify_api_key)) -> AlarmResponse:
    """Trigger the daily alarm: query DB and notify Slack."""
    return alarm_service.run()


@router.get("/status", response_model=StatusResponse)
def get_status() -> StatusResponse:
    """Return the status of the last alarm execution."""
    return alarm_service.get_status()
