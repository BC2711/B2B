from sqlalchemy.orm import Session
from sqlalchemy.exc import IntegrityError
from fastapi import HTTPException, status
from app.models.product_images import ProductImages
from app.models.schemas.product_image import ProductImage as ProductImageCreate
from typing import Optional, List


class CRUDProductImage:
    def get_all_images(
        self, db: Session, skip: int = 0, limit: int = 100
    ) -> List[ProductImages]:
        return db.query(ProductImages).offset(skip).limit(min(limit, 100)).all()

    def get(self, db: Session, image_id: int) -> Optional[ProductImages]:
        return db.query(ProductImages).filter(ProductImages.id == image_id).first()

    def create(
        self,
        db: Session,
        image_in: ProductImageCreate,
        created_by: Optional[int] = None,
    ) -> ProductImages:
        try:
            db_image = ProductImages(
                url=image_in.url,
                product_id=image_in.product_id,
                created_by=created_by,
                updated_by=created_by,
            )
            db.add(db_image)
            db.commit()
            db.refresh(db_image)
            return db_image
        except IntegrityError as e:
            db.rollback()
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Image with this URL already exists",
            )

    def update(
        self,
        db: Session,
        image_id: int,
        image_in: ProductImageCreate,
        updated_by: Optional[int] = None,
    ) -> Optional[ProductImages]:
        db_image = self.get(db, image_id)
        if not db_image:
            return None
        try:
            if image_in.url is not None:
                db_image.url = image_in.url
            if image_in.product_id is not None:
                db_image.product_id = image_in.product_id
            db_image.updated_by = updated_by
            db.commit()
            db.refresh(db_image)
            return db_image
        except IntegrityError as e:
            db.rollback()
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Image with this URL already exists",
            )

    def delete(self, db: Session, image_id: int) -> bool:
        db_image = self.get(db, image_id)
        if not db_image:
            return False
        try:
            db.delete(db_image)
            db.commit()
            return True
        except IntegrityError as e:
            db.rollback()
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Cannot delete image with associated products",
            )

product_images = CRUDProductImage()