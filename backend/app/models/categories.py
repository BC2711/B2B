from sqlalchemy import Column, Integer, String, ForeignKey, DateTime
from sqlalchemy.sql import func
from sqlalchemy.orm import relationship
from app.db.session import Base

class Category(Base):
    __tablename__ = "categories"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(100), unique=True, index=True, nullable=False)
    description = Column(String(255), nullable=True)
    created_at = Column(DateTime, nullable=False, server_default=func.now())
    updated_at = Column(DateTime, nullable=False, server_default=func.now(), onupdate=func.now())
    created_by = Column(Integer, ForeignKey("users.id"), nullable=True)  
    updated_by = Column(Integer, ForeignKey("users.id"), nullable=True)

    products = relationship("Product", back_populates="category")
    creator = relationship("User", foreign_keys=[created_by], back_populates="created_categories")
    updater = relationship("User", foreign_keys=[updated_by], back_populates="updated_categories")