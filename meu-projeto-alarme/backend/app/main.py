"""FastAPI application entry point for Alarm API."""
import logging
import os
from contextlib import asynccontextmanager
from typing import Any

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from .config import settings
from .database import db_manager
from .routers import alarm

logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s %(name)s %(levelname)s %(message)s",
)
logger = logging.getLogger(__name__)


@asynccontextmanager
async def lifespan(app: FastAPI):
    logger.info("Starting Alarm API")
    try:
        db_manager.init_pool()
    except Exception as e:
        logger.warning(f"DB pool init deferred: {e}")
    yield
    db_manager.close_pool()
    logger.info("Alarm API shutdown complete")


app = FastAPI(
    title="Alarm API",
    description="Daily UC1 ingestion monitor — queries MySQL and notifies Slack",
    version="1.0.0",
    lifespan=lifespan,
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(alarm.router, prefix="/api/v1")


@app.get("/health")
def health() -> dict[str, Any]:
    return {"status": "healthy"}


@app.get("/api_app/status")
def api_app_status() -> dict[str, Any]:
    return {
        "status": "ready",
        "app": "alarm-api",
        "port": int(os.environ.get("FASTAPI_PORT", "8000")),
    }


application = app  # RapidCanvas alias

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("app.main:app", host="0.0.0.0", port=8000, reload=True)
