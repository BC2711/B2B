from sqlalchemy.orm import Session
from app.models.item import Item
from app.models.schemas import ItemCreate


class CRUDItem:
    def get_multi(self, db: Session, skip: int = 0, limit: int = 100):
        return db.query(Item).offset(skip).limit(limit).all()

    def create(self, db: Session, item_in: ItemCreate, owner_id: int):
        db_item = Item(**item_in.dict(), owner_id=owner_id)
        db.add(db_item)
        db.commit()
        db.refresh(db_item)
        return db_item

    def get(self, db: Session, item_id: int):
        return db.query(Item).filter(Item.id == item_id).first()


item = CRUDItem()
