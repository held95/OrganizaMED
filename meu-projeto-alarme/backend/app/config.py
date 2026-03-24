"""Configuration settings for Alarm API."""
from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    model_config = SettingsConfigDict(env_file=".env", case_sensitive=False, extra="ignore")

    # MySQL
    db_host: str = "35.202.242.146"
    db_port: int = 3306
    db_name: str = "gruporio_qa"
    db_user: str = "gg_user"
    db_password: str = ""

    # Slack
    slack_webhook_url: str = ""

    # API Auth
    alarm_api_key: str = ""

    # App
    alarm_hour: str = "06h00"
    app_env: str = "production"


settings = Settings()
