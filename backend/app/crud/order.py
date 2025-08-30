from sqlalchemy.orm import Session
from sqlalchemy import func
from sqlalchemy.exc import IntegrityError
from fastapi import HTTPException, status
from app.models.orders import Orders
from app.models.schemas.order import OrderCreate, OrderUpdate, OrderStatus
from typing import Optional, List

class CRUDOrders:
    def get_all_orders(self, db: Session, skip: int = 0, limit: int = 100) -> List[Orders]:
        return db.query(Orders).offset(skip).limit(min(limit, 100)).all()

    def get(self, db: Session, order_id: int) -> Optional[Orders]:
        return db.query(Orders).filter(Orders.id == order_id).first()

    def create(self, db: Session, order_in: OrderCreate, requested_by: int) -> Orders:
        try:
            db_order = Orders(
                order_number=order_in.order_number,
                product_id=order_in.product_id,
                customer_id=order_in.customer_id,
                requested_by=requested_by,
            )
            db.add(db_order)
            db.commit()
            db.refresh(db_order)
            return db_order
        except IntegrityError as e:
            db.rollback()
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Order number already exists or invalid product/customer ID",
            )

    def update(self, db: Session, order_id: int, order_in: OrderUpdate, updated_by: Optional[int] = None) -> Optional[Orders]:
        db_order = self.get(db, order_id)
        if not db_order:
            return None
        try:
            if order_in.order_number is not None:
                db_order.order_number = order_in.order_number
            if order_in.product_id is not None:
                db_order.product_id = order_in.product_id
            if order_in.customer_id is not None:
                db_order.customer_id = order_in.customer_id
            if order_in.status is not None:
                db_order.status = order_in.status
                if order_in.status == OrderStatus.APPROVED:
                    db_order.approved_by = updated_by
                    db_order.date_approved = func.now()
                elif order_in.status == OrderStatus.CANCELLED:
                    db_order.cancelled_by = updated_by
                    db_order.date_cancelled = func.now()
            db.commit()
            db.refresh(db_order)
            return db_order
        except IntegrityError as e:
            db.rollback()
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Order number already exists or invalid product/customer ID",
            )

    def delete(self, db: Session, order_id: int) -> bool:
        db_order = self.get(db, order_id)
        if not db_order:
            return False
        db.delete(db_order)
        db.commit()
        return True

    def approve_order(self, db: Session, order_id: int, approved_by: int) -> Optional[Orders]:
        db_order = self.get(db, order_id)
        if not db_order:
            return None
        try:
            db_order.status = OrderStatus.APPROVED
            db_order.approved_by = approved_by
            db_order.date_approved = func.now()
            db.commit()
            db.refresh(db_order)
            return db_order
        except IntegrityError as e:
            db.rollback()
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Error approving order",
            )

    def cancel_order(self, db: Session, order_id: int, cancelled_by: int) -> Optional[Orders]:
        db_order = self.get(db, order_id)
        if not db_order:
            return None
        try:
            db_order.status = OrderStatus.CANCELLED
            db_order.cancelled_by = cancelled_by
            db_order.date_cancelled = func.now()
            db.commit()
            db.refresh(db_order)
            return db_order
        except IntegrityError as e:
            db.rollback()
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Error cancelling order",
            )

orders = CRUDOrders()