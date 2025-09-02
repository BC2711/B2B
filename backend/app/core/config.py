from pydantic_settings import BaseSettings
from pydantic import Field, field_validator, ConfigDict
from typing import List, Optional
import warnings
import secrets
import json
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

    # CORS Configuration
    CORS_ORIGINS: List[str] = Field(
        default=[
            "http://localhost:5173",
            "http://127.0.0.1:5173",
            "http://localhost:3000",
            "http://127.0.0.1:3000",
        ],
        description="List of allowed CORS origins. Can be comma-separated string or JSON array in env var.",
    )

    # Construct DATABASE_URL securely
    @property
    def DATABASE_URL(self) -> str:
        return f"postgresql+psycopg2://{self.POSTGRES_USER}:{self.POSTGRES_PASSWORD}@{self.POSTGRES_SERVER}:{self.POSTGRES_PORT}/{self.POSTGRES_DB}"

    # Field validators
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
    def validate_cors_origins(cls, v: Optional[str | List[str]]) -> List[str]:
        print(f"Raw CORS_ORIGINS value: {v!r}")  # Debug logging
        if v is None:
            print("CORS_ORIGINS is None, using default")
            return [
                "http://localhost:5173",
                "http://127.0.0.1:5173",
                "http://localhost:3000",
                "http://127.0.0.1:3000",
            ]
        if isinstance(v, str):
            if not v.strip():
                print("CORS_ORIGINS is empty string, using default")
                return [
                    "http://localhost:5173",
                    "http://127.0.0.1:5173",
                    "http://localhost:3000",
                    "http://127.0.0.1:3000",
                ]
            if v.startswith("[") and v.endswith("]"):
                try:
                    parsed = json.loads(v)
                    if not isinstance(parsed, list):
                        raise ValueError("CORS_ORIGINS JSON must be a list")
                    return parsed
                except json.JSONDecodeError as e:
                    print(f"JSON parsing failed: {e}")
            # Handle comma-separated string
            origins = [origin.strip() for origin in v.split(",") if origin.strip()]
            if not origins:
                raise ValueError("CORS_ORIGINS is empty after parsing")
            return origins
        elif isinstance(v, list):
            return v
        else:
            raise ValueError(f"Invalid CORS_ORIGINS type: {type(v)}")

    model_config = ConfigDict(
        env_file="D:/projects/B2B/backend/.env",
        env_file_encoding="utf-8",
        case_sensitive=True,
        extra="ignore",
        env_prefix="",
    )


# Generate a secure secret key if not provided (for development only)
def generate_secret_key() -> str:
    return secrets.token_urlsafe(64)


# Instantiate settings
settings = Settings()
