from pydantic import BaseModel, EmailStr, field_validator
from pydantic.types import StringConstraints
from datetime import datetime
from typing import Optional, List, Annotated

class ProductImage(BaseModel):
    id: int
    image_url: Annotated[str, StringConstraints(max_length=255)]
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True