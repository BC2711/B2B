from sqlalchemy import Column, Integer, String, ForeignKey, DateTime
from sqlalchemy.sql import func
from sqlalchemy.orm import relationship
from app.db.session import Base

class ProductImages(Base):
    __tablename__ = "product_images"

    id = Column(Integer, primary_key=True, index=True)
    image_url = Column(String(255), nullable=False)
    product_id = Column(Integer, ForeignKey("products.id"), nullable=False)
    created_at = Column(DateTime, nullable=False, server_default=func.now())
    updated_at = Column(DateTime, nullable=False, server_default=func.now(), onupdate=func.now())
    created_by = Column(Integer, ForeignKey("users.id"), nullable=True)
    updated_by = Column(Integer, ForeignKey("users.id"), nullable=True)

    product = relationship("Product", back_populates="images")
    creator = relationship("User", foreign_keys=[created_by], back_populates="created_product_images")
    updater = relationship("User", foreign_keys=[updated_by], back_populates="updated_product_images")