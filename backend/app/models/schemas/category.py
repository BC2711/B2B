from pydantic import BaseModel, EmailStr, field_validator
from pydantic.types import StringConstraints
from typing import Optional, List, Annotated
from datetime import datetime
from enum import Enum


# Category Schemas
class CategoryBase(BaseModel):
    name: Annotated[str, StringConstraints(min_length=1, max_length=100)]
    description: Optional[Annotated[str, StringConstraints(max_length=255)]] = None


class CategoryCreate(CategoryBase):
    pass


class CategoryUpdate(CategoryBase):
    name: Optional[Annotated[str, StringConstraints(min_length=1, max_length=100)]] = (
        None
    )
    description: Optional[Annotated[str, StringConstraints(max_length=255)]] = None


class Category(CategoryBase):
    id: int
    created_at: datetime
    updated_at: datetime
    created_by: Optional[int] = None
    updated_by: Optional[int] = None

    class Config:
        from_attributes = True
