from fastapi import APIRouter
from app.api.v1.endpoints import users, auth, categories, product, order, message

api_router = APIRouter()

api_router.include_router(auth.router, prefix="/auth", tags=["auth"])
api_router.include_router(users.router, prefix="/users", tags=["users"])
api_router.include_router(message.router, prefix="/messages", tags=["messages"])
api_router.include_router(categories.router, prefix="/categories", tags=["categories"])
api_router.include_router(product.router, prefix="/products", tags=["products"])
api_router.include_router(order.router, prefix="/orders", tags=["orders"])  