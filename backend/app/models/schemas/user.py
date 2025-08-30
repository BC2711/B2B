from pydantic import BaseModel, EmailStr, field_validator
from pydantic.types import StringConstraints
from typing import Optional, List, Annotated
from datetime import datetime
from enum import Enum


# Enums (aligned with SQLAlchemy)
class UserRole(str, Enum):
    USER = "USER"
    ADMIN = "ADMIN"
    MANAGER = "MANAGER"
    SALES = "SALES"
    SUPPORT = "SUPPORT"
    MARKETING = "MARKETING"
    HR = "HR"


class UserStatus(str, Enum):
    ACTIVE = "ACTIVE"
    INACTIVE = "INACTIVE"
    PENDING = "PENDING"
    SUSPENDED = "SUSPENDED"


class OrderStatus(str, Enum):
    REQUEST = "REQUEST"
    APPROVED = "APPROVED"
    CANCELLED = "CANCELLED"


# Token Schemas
class Token(BaseModel):
    access_token: str
    token_type: str


class TokenData(BaseModel):
    email: Optional[str] = None


# User Schemas
class UserBase(BaseModel):
    email: EmailStr
    first_name: Annotated[str, StringConstraints(min_length=1, max_length=50)]
    last_name: Annotated[str, StringConstraints(min_length=1, max_length=50)]
    phone_number: Annotated[str, StringConstraints(max_length=15)]

    @field_validator("phone_number", mode="before")
    @classmethod
    def validate_phone_number(cls, v: str) -> str:
        import re

        pattern = r"^\+?\d{10,15}$"
        if not re.match(pattern, v):
            raise ValueError("Invalid phone number format")
        return v


class UserCreate(UserBase):
    password: Annotated[str, StringConstraints(min_length=8)]


class UserLogin(BaseModel):
    email: EmailStr
    password: Annotated[str, StringConstraints(min_length=8)]


class User(UserBase):
    id: int
    status: UserStatus = UserStatus.PENDING
    role: UserRole = UserRole.USER
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True
