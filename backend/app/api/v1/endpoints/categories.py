from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from app.db.session import get_db
from app.api.deps import get_current_active_user
from app.models.schemas.category import Category, CategoryCreate, CategoryUpdate
from app.models.user import User, UserRole
from app.crud import categories

router = APIRouter()


def get_current_admin_user(
    current_user: User = Depends(get_current_active_user),
) -> User:
    if current_user.role not in {UserRole.ADMIN, UserRole.MANAGER}:
        raise HTTPException(status_code=403, detail="Not authorized")
    return current_user


@router.post("/categories/", response_model=Category)
def create_category(
    category_in: CategoryCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_admin_user),
):
    return categories.create(db, category_in, created_by=current_user.id)


@router.get("/categories/{category_id}", response_model=Category)
def get_category(category_id: int, db: Session = Depends(get_db)):
    category = categories.get(db, category_id)
    if not category:
        raise HTTPException(status_code=404, detail="Category not found")
    return category


@router.put("/categories/{category_id}", response_model=Category)
def update_category(
    category_id: int,
    category_in: CategoryUpdate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_admin_user),
):
    category = categories.update(
        db, category_id, category_in, updated_by=current_user.id
    )
    if not category:
        raise HTTPException(status_code=404, detail="Category not found")
    return category


@router.delete("/categories/{category_id}")
def delete_category(
    category_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_admin_user),
):
    if not categories.delete(db, category_id):
        raise HTTPException(status_code=404, detail="Category not found")
    return {"detail": "Category deleted"}
