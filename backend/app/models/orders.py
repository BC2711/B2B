from sqlalchemy import Column, Integer, String, ForeignKey, DateTime
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
from sqlalchemy.sql.sqltypes import Enum as SQLEnum 
from enum import Enum
from app.db.session import Base

class OrderStatus(Enum):
    REQUEST = "REQUEST"
    APPROVED = "APPROVED"
    CANCELLED = "CANCELLED"

class Orders(Base):
    __tablename__ = "orders"

    id = Column(Integer, primary_key=True, index=True)
    order_number = Column(Integer, unique=True, nullable=False, index=True)
    product_id = Column(Integer, ForeignKey("products.id"), nullable=False)
    customer_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    status = Column(SQLEnum(OrderStatus), nullable=False, default=OrderStatus.REQUEST)
    requested_by = Column(Integer, ForeignKey("users.id"), nullable=False)
    approved_by = Column(Integer, ForeignKey("users.id"), nullable=True)
    cancelled_by = Column(Integer, ForeignKey("users.id"), nullable=True)
    date_requested = Column(DateTime, nullable=False, server_default=func.now())
    date_approved = Column(DateTime, nullable=True)
    date_cancelled = Column(DateTime, nullable=True)

    customer = relationship("User", foreign_keys=[customer_id], back_populates="orders")
    product = relationship("Product", foreign_keys=[product_id], back_populates="orders")
    requested_by_user = relationship("User", foreign_keys=[requested_by], back_populates="requested_orders")
    approved_by_user = relationship("User", foreign_keys=[approved_by], back_populates="approved_orders")
    cancelled_by_user = relationship("User", foreign_keys=[cancelled_by], back_populates="cancelled_orders")