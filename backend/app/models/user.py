from sqlalchemy import Column, Integer, String, ForeignKey, DateTime
from sqlalchemy.sql import func
from sqlalchemy.orm import relationship
from sqlalchemy.sql.sqltypes import Enum as SQLEnum
from enum import Enum
from app.db.session import Base

class UserRole(Enum):
    USER = "USER"
    ADMIN = "ADMIN"
    MANAGER = "MANAGER"
    SALES = "SALES"
    SUPPORT = "SUPPORT"
    MARKETING = "MARKETING"
    HR = "HR"

class UserStatus(Enum):
    ACTIVE = "ACTIVE"
    INACTIVE = "INACTIVE"
    PENDING = "PENDING"
    SUSPENDED = "SUSPENDED"

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    email = Column(String(255), unique=True, index=True, nullable=False)
    first_name = Column(String(50), nullable=False)
    last_name = Column(String(50), nullable=False)
    phone_number = Column(String(15), unique=True, nullable=False)
    hashed_password = Column(String(255), nullable=False)
    status = Column(SQLEnum(UserStatus), default=UserStatus.PENDING, nullable=False)
    role = Column(SQLEnum(UserRole), default=UserRole.USER, nullable=False)
    created_at = Column(DateTime, nullable=False, server_default=func.now())
    updated_at = Column(DateTime, nullable=False, server_default=func.now(), onupdate=func.now())
    created_by = Column(Integer, ForeignKey("users.id"), nullable=True)
    updated_by = Column(Integer, ForeignKey("users.id"), nullable=True)

    # Relationships
    sent_messages = relationship("Messages", foreign_keys="Messages.sender_id", back_populates="sender")
    received_messages = relationship("Messages", foreign_keys="Messages.receiver_id", back_populates="receiver")
    orders = relationship("Orders", foreign_keys="Orders.customer_id", back_populates="customer")
    requested_orders = relationship("Orders", foreign_keys="Orders.requested_by", back_populates="requested_by_user")
    approved_orders = relationship("Orders", foreign_keys="Orders.approved_by", back_populates="approved_by_user")
    cancelled_orders = relationship("Orders", foreign_keys="Orders.cancelled_by", back_populates="cancelled_by_user")
    created_categories = relationship("Category", foreign_keys="Category.created_by", back_populates="creator")
    updated_categories = relationship("Category", foreign_keys="Category.updated_by", back_populates="updater")
    created_products = relationship("Product", foreign_keys="Product.created_by", back_populates="creator")
    updated_products = relationship("Product", foreign_keys="Product.updated_by", back_populates="updater")
    created_product_images = relationship("ProductImages", foreign_keys="ProductImages.created_by", back_populates="creator")
    updated_product_images = relationship("ProductImages", foreign_keys="ProductImages.updated_by", back_populates="updater")
    created_users = relationship("User", foreign_keys="User.created_by", back_populates="creator_users")
    updated_users = relationship("User", foreign_keys="User.updated_by", back_populates="updater_users")
    creator_users = relationship("User", foreign_keys=[created_by], back_populates="created_users", remote_side=[id])
    updater_users = relationship("User", foreign_keys=[updated_by], back_populates="updated_users", remote_side=[id])