from sqlalchemy.orm import Session
from sqlalchemy.exc import IntegrityError
from fastapi import HTTPException, status
from app.models.messages import Messages
from app.models.schemas.message import MessageCreate, MessageUpdate
from typing import Optional, List


class CRUDMessages:
    def get_all_messages(
        self, db: Session, skip: int = 0, limit: int = 100
    ) -> List[Messages]:
        return db.query(Messages).offset(skip).limit(min(limit, 100)).all()

    def get(self, db: Session, message_id: int) -> Optional[Messages]:
        return db.query(Messages).filter(Messages.id == message_id).first()

    def create(
        self, db: Session, message_in: MessageCreate, sender_id: int
    ) -> Messages:
        try:
            db_message = Messages(
                message=message_in.message,
                sender_id=sender_id,
                receiver_id=message_in.receiver_id,
            )
            db.add(db_message)
            db.commit()
            db.refresh(db_message)
            return db_message
        except IntegrityError:
            db.rollback()
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Invalid sender or receiver ID",
            )

    def update(
        self, db: Session, message_id: int, message_in: MessageUpdate
    ) -> Optional[Messages]:
        db_message = self.get(db, message_id)
        if not db_message:
            return None
        try:
            if message_in.message is not None:
                db_message.message = message_in.message
            if message_in.receiver_id is not None:
                db_message.receiver_id = message_in.receiver_id
            db.commit()
            db.refresh(db_message)
            return db_message
        except IntegrityError:
            db.rollback()
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Invalid receiver ID",
            )

    def delete(self, db: Session, message_id: int) -> bool:
        db_message = self.get(db, message_id)
        if not db_message:
            return False
        db.delete(db_message)
        db.commit()
        return True

    def get_by_sender(
        self, db: Session, sender_id: int, skip: int = 0, limit: int = 100
    ) -> List[Messages]:
        return (
            db.query(Messages)
            .filter(Messages.sender_id == sender_id)
            .offset(skip)
            .limit(min(limit, 100))
            .all()
        )

    def get_by_receiver(
        self, db: Session, receiver_id: int, skip: int = 0, limit: int = 100
    ) -> List[Messages]:
        return (
            db.query(Messages)
            .filter(Messages.receiver_id == receiver_id)
            .offset(skip)
            .limit(min(limit, 100))
            .all()
        )


messages = CRUDMessages()
