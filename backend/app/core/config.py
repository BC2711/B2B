from pydantic_settings import BaseSettings
from pydantic import Field, field_validator, PostgresDsn
from typing import Optional, Literal
from datetime import timedelta
import secrets
import warnings
import os


class Settings(BaseSettings):
    # Application Configuration
    PROJECT_NAME: str = "B2B Platform"
    API_V1_STR: str = "/api/v1"
    ENVIRONMENT: str = "development"  # development, staging, production

    # PostgreSQL Database Configuration
    POSTGRES_SERVER: str = Field(..., validation_alias="POSTGRES_SERVER")
    POSTGRES_USER: str = Field(..., validation_alias="POSTGRES_USER")
    POSTGRES_PASSWORD: str = Field(..., validation_alias="POSTGRES_PASSWORD")
    POSTGRES_DB: str = Field(..., validation_alias="POSTGRES_DB")
    POSTGRES_PORT: str = Field("5432", validation_alias="POSTGRES_PORT")

    # JWT Configuration
    SECRET_KEY: str = Field(..., validation_alias="SECRET_KEY")
    ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 30

    # Security Settings
    CORS_ORIGINS: list[str] = ["http://localhost:3000", "http://localhost:8000"]

    # Construct DATABASE_URL securely
    @property
    def DATABASE_URL(self) -> str:
        return f"postgresql+psycopg2://{self.POSTGRES_USER}:{self.POSTGRES_PASSWORD}@{self.POSTGRES_SERVER}:{self.POSTGRES_PORT}/{self.POSTGRES_DB}"

    # Optional: For async support
    # @property
    # def ASYNC_DATABASE_URL(self) -> str:
    #     return f"postgresql+asyncpg://{self.POSTGRES_USER}:{self.POSTGRES_PASSWORD}@{self.POSTGRES_SERVER}:{self.POSTGRES_PORT}/{self.POSTGRES_DB}"

    # Field validation using the new @field_validator
    @field_validator("SECRET_KEY", mode="before")
    @classmethod
    def validate_secret_key(cls, v: str) -> str:
        if v == "your-secret-key-change-in-production":
            warnings.warn(
                "Using default SECRET_KEY! This is insecure for production.",
                UserWarning,
                stacklevel=2,
            )
        elif len(v) < 32:  # Minimum length for HS256
            raise ValueError("SECRET_KEY must be at least 32 characters long")
        return v

    @field_validator("ENVIRONMENT")
    @classmethod
    def validate_environment(cls, v: str) -> str:
        if v not in ["development", "staging", "production"]:
            raise ValueError("ENVIRONMENT must be development, staging, or production")
        return v

    @field_validator("CORS_ORIGINS", mode="before")
    @classmethod
    def validate_cors_origins(cls, v: str | list[str]) -> list[str]:
        if isinstance(v, str):
            # Handle comma-separated string from env var
            return [origin.strip() for origin in v.split(",") if origin.strip()]
        return v

    class Config:
        env_file = ".env"
        env_file_encoding = "utf-8"
        case_sensitive = True
        extra = "ignore"  # Ignore extra environment variables


# Generate a secure secret key if not provided (for development only)
def generate_secret_key() -> str:
    return secrets.token_urlsafe(64)


# Instantiate settings
settings = Settings()
