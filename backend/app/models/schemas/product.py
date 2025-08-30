from pydantic import BaseModel
from pydantic.types import StringConstraints
from typing import Optional, List, Annotated
from .category import Category  # Pydantic Category
from .product_image import ProductImage  # Corrected import

class ProductBase(BaseModel):
    name: Annotated[str, StringConstraints(min_length=1, max_length=100)]
    description: Optional[Annotated[str, StringConstraints(max_length=255)]] = None
    price: float
    category_id: int  # Added to align with SQLAlchemy model

class ProductCreate(ProductBase):
    pass

class ProductUpdate(ProductBase):
    name: Optional[Annotated[str, StringConstraints(min_length=1, max_length=100)]] = None
    description: Optional[Annotated[str, StringConstraints(max_length=255)]] = None
    price: Optional[float] = None
    category_id: Optional[int] = None

class Product(ProductBase):
    id: int
    category: Category  # Pydantic Category
    images: List[ProductImage] = []

    class Config:
        from_attributes = True