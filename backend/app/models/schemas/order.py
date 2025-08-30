from pydantic import BaseModel
from pydantic.types import StringConstraints
from typing import Optional, List, Annotated
from datetime import datetime
from enum import Enum

# Enums
class OrderStatus(str, Enum):
    REQUEST = "REQUEST"
    APPROVED = "APPROVED"
    CANCELLED = "CANCELLED"

# Order Schemas
class OrderBase(BaseModel):
    order_number: int
    product_id: int
    customer_id: int

class OrderCreate(OrderBase):
    pass  # No additional fields needed for creation

class OrderUpdate(BaseModel):
    order_number: Optional[int] = None
    product_id: Optional[int] = None
    customer_id: Optional[int] = None
    status: Optional[OrderStatus] = None

class Order(OrderBase):
    id: int
    status: OrderStatus
    product: "Product"
    customer: "User"
    requested_by: int
    approved_by: Optional[int] = None
    cancelled_by: Optional[int] = None
    date_requested: datetime
    date_approved: Optional[datetime] = None
    date_cancelled: Optional[datetime] = None

    class Config:
        from_attributes = True

# Simplified Product and User schemas for relationships
class Product(BaseModel):
    id: int
    name: Annotated[str, StringConstraints(min_length=1, max_length=100)]
    description: Optional[Annotated[str, StringConstraints(max_length=255)]] = None
    price: float
    category_id: int

    class Config:
        from_attributes = True

class User(BaseModel):
    id: int
    email: str
    first_name: Annotated[str, StringConstraints(min_length=1, max_length=50)]
    last_name: Annotated[str, StringConstraints(min_length=1, max_length=50)]

    class Config:
        from_attributes = True