# Import CRUD classes here
from app.crud.user import user
from app.crud.categories import categories
from app.crud.product import products
from app.crud.order import orders
from app.crud.message import messages
from app.crud.product_images import product_images

__all__ = ["user", "categories", "products", "orders", "messages", "product_images"]
