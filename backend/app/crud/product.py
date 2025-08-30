from sqlalchemy.orm import Session
from sqlalchemy.exc import IntegrityError
from fastapi import HTTPException, status
from app.models.products import Product  
from app.models.schemas.product import ProductCreate, ProductUpdate, Product
from typing import Optional, List


class CRUDProducts:
    def get_all_products(
        self, db: Session, skip: int = 0, limit: int = 100
    ) -> List[Product]:
        return db.query(Product).offset(skip).limit(min(limit, 100)).all()

    def get(self, db: Session, product_id: int) -> Optional[Product]:
        return db.query(Product).filter(Product.id == product_id).first()

    def create(
        self, db: Session, product_in: ProductCreate, created_by: Optional[int] = None
    ) -> Product:
        try:
            db_product = Product(
                name=product_in.name,
                description=product_in.description,
                price=product_in.price,
                category_id=product_in.category_id,
                created_by=created_by,
                updated_by=created_by,
            )
            db.add(db_product)
            db.commit()
            db.refresh(db_product)
            return db_product
        except IntegrityError as e:
            db.rollback()
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Product with this name already exists or invalid category_id",
            )

    def update(
        self,
        db: Session,
        product_id: int,
        product_in: ProductUpdate,
        updated_by: Optional[int] = None,
    ) -> Optional[Product]:
        db_product = self.get(db, product_id)
        if not db_product:
            return None
        try:
            if product_in.name is not None:
                db_product.name = product_in.name
            if product_in.description is not None:
                db_product.description = product_in.description
            if product_in.price is not None:
                db_product.price = product_in.price
            if product_in.category_id is not None:
                db_product.category_id = product_in.category_id
            db_product.updated_by = updated_by
            db.commit()
            db.refresh(db_product)
            return db_product
        except IntegrityError as e:
            db.rollback()
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Product with this name already exists or invalid category_id",
            )

    def delete(self, db: Session, product_id: int) -> bool:
        db_product = self.get(db, product_id)
        if not db_product:
            return False
        try:
            db.delete(db_product)
            db.commit()
            return True
        except IntegrityError as e:
            db.rollback()
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Cannot delete product with associated orders or images",
            )


products = CRUDProducts()
