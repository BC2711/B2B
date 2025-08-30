from sqlalchemy.orm import Session
from sqlalchemy.exc import IntegrityError
from fastapi import HTTPException, status
from app.models.categories import Category
from app.models.schemas.category import CategoryCreate, CategoryUpdate, Category
from typing import Optional, List


class CRUDCategories:
    def get_all_categories(
        self, db: Session, skip: int = 0, limit: int = 100
    ) -> List[Category]:
        return db.query(Category).offset(skip).limit(min(limit, 100)).all()

    def get(self, db: Session, category_id: int) -> Optional[Category]:
        return db.query(Category).filter(Category.id == category_id).first()

    def create(
        self, db: Session, category_in: CategoryCreate, created_by: Optional[int] = None
    ) -> Category:
        try:
            db_category = Category(
                name=category_in.name,
                description=category_in.description,
                created_by=created_by,
                updated_by=created_by,
            )
            db.add(db_category)
            db.commit()
            db.refresh(db_category)
            return db_category
        except IntegrityError as e:
            db.rollback()
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Category with this name already exists",
            )

    def update(
        self,
        db: Session,
        category_id: int,
        category_in: CategoryUpdate,
        updated_by: Optional[int] = None,
    ) -> Optional[Category]:
        db_category = self.get(db, category_id)
        if not db_category:
            return None
        try:
            if category_in.name is not None:
                db_category.name = category_in.name
            if category_in.description is not None:
                db_category.description = category_in.description
            db_category.updated_by = updated_by
            db.commit()
            db.refresh(db_category)
            return db_category
        except IntegrityError as e:
            db.rollback()
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Category with this name already exists",
            )

    def delete(self, db: Session, category_id: int) -> bool:
        db_category = self.get(db, category_id)
        if not db_category:
            return False
        try:
            db.delete(db_category)
            db.commit()
            return True
        except IntegrityError as e:
            db.rollback()
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Cannot delete category with associated products",
            )


categories = CRUDCategories()
