from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from app.db.session import get_db
from app.models.schemas.order import Order, OrderCreate, OrderUpdate
from app.models.user import User, UserRole
from app.crud import orders
from app.api.deps import get_current_active_user

router = APIRouter()


def get_current_admin_user(
    current_user: User = Depends(get_current_active_user),
) -> User:
    if current_user.role not in {UserRole.ADMIN, UserRole.MANAGER}:
        raise HTTPException(status_code=403, detail="Not authorized")
    return current_user


@router.get("/orders/", response_model=list[Order])
def get_orders(db: Session = Depends(get_db)):
    return orders.get_all_orders(db, skip=0, limit=100)


@router.post("/orders/", response_model=Order)
def create_order(
    order_in: OrderCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_active_user),
):
    return orders.create(db, order_in, requested_by=current_user.id)


@router.get("/orders/{order_id}", response_model=Order)
def get_order(order_id: int, db: Session = Depends(get_db)):
    order = orders.get(db, order_id)
    if not order:
        raise HTTPException(status_code=404, detail="Order not found")
    return order


@router.put("/orders/{order_id}", response_model=Order)
def update_order(
    order_id: int,
    order_in: OrderUpdate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_admin_user),
):
    order = orders.update(db, order_id, order_in, updated_by=current_user.id)
    if not order:
        raise HTTPException(status_code=404, detail="Order not found")
    return order


@router.post("/orders/{order_id}/approve", response_model=Order)
def approve_order(
    order_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_admin_user),
):
    order = orders.approve_order(db, order_id, approved_by=current_user.id)
    if not order:
        raise HTTPException(status_code=404, detail="Order not found")
    return order


@router.post("/orders/{order_id}/cancel", response_model=Order)
def cancel_order(
    order_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_admin_user),
):
    order = orders.cancel_order(db, order_id, cancelled_by=current_user.id)
    if not order:
        raise HTTPException(status_code=404, detail="Order not found")
    return order


@router.delete("/orders/{order_id}")
def delete_order(
    order_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_admin_user),
):
    if not orders.delete(db, order_id):
        raise HTTPException(status_code=404, detail="Order not found")
    return {"detail": "Order deleted"}
