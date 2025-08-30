from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from app.db.session import get_db
from app.models.schemas.product import Product, ProductCreate, ProductUpdate
from app.models.user import User, UserRole
from app.crud import products
from app.api.deps import get_current_active_user

router = APIRouter()


def get_current_admin_user(
    current_user: User = Depends(get_current_active_user),
) -> User:
    if current_user.role not in {UserRole.ADMIN, UserRole.MANAGER}:
        raise HTTPException(status_code=403, detail="Not authorized")
    return current_user


@router.post("/products/", response_model=Product)
def create_product(
    product_in: ProductCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_admin_user),
):
    return products.create(db, product_in, created_by=current_user.id)


@router.get("/products/{product_id}", response_model=Product)
def get_product(product_id: int, db: Session = Depends(get_db)):
    product = products.get(db, product_id)
    if not product:
        raise HTTPException(status_code=404, detail="Product not found")
    return product


@router.put("/products/{product_id}", response_model=Product)
def update_product(
    product_id: int,
    product_in: ProductUpdate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_admin_user),
):
    product = products.update(db, product_id, product_in, updated_by=current_user.id)
    if not product:
        raise HTTPException(status_code=404, detail="Product not found")
    return product


@router.delete("/products/{product_id}")
def delete_product(
    product_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_admin_user),
):
    if not products.delete(db, product_id):
        raise HTTPException(status_code=404, detail="Product not found")
    return {"detail": "Product deleted"}
