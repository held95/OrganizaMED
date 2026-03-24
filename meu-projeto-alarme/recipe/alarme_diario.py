"""RapidCanvas Recipe — triggers the daily alarm endpoint.

Schedule: 0 9 * * * (UTC) = 06h00 BRT
Timeout: 60 seconds
"""
import os
import sys

import httpx

BACKEND_URL = os.environ["ALARM_BACKEND_URL"]
API_KEY = os.environ["ALARM_API_KEY"]

try:
    response = httpx.post(
        f"{BACKEND_URL}/api/v1/alarm/trigger",
        headers={"X-API-Key": API_KEY},
        timeout=30.0,
    )
    response.raise_for_status()
    result = response.json()
    print(f"Alarm triggered successfully: {result}")
    sys.exit(0)
except httpx.HTTPStatusError as e:
    print(f"ERROR: Backend returned HTTP {e.response.status_code}: {e.response.text}", file=sys.stderr)
    sys.exit(1)
except Exception as e:
    print(f"ERROR: {e}", file=sys.stderr)
    sys.exit(1)
