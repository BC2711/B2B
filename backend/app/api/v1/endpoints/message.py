from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from app.db.session import get_db
from app.models.schemas.message import Message, MessageCreate, MessageUpdate
from app.models.user import User, UserRole
from app.crud import messages
from app.api.deps import get_current_active_user
from typing import List

router = APIRouter()

def get_current_admin_or_self(current_user: User = Depends(get_current_active_user)) -> User:
    return current_user

@router.post("/messages/", response_model=Message)
def create_message(
    message_in: MessageCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_active_user),
):
    return messages.create(db, message_in, sender_id=current_user.id)

@router.get("/messages/{message_id}", response_model=Message)
def get_message(
    message_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_active_user),
):
    message = messages.get(db, message_id)
    if not message:
        raise HTTPException(status_code=404, detail="Message not found")
    if current_user.id not in {message.sender_id, message.receiver_id} and current_user.role not in {UserRole.ADMIN, UserRole.MANAGER}:
        raise HTTPException(status_code=403, detail="Not authorized")
    return message

@router.put("/messages/{message_id}", response_model=Message)
def update_message(
    message_id: int,
    message_in: MessageUpdate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_admin_or_self),
):
    message = messages.get(db, message_id)
    if not message:
        raise HTTPException(status_code=404, detail="Message not found")
    if current_user.id != message.sender_id and current_user.role not in {UserRole.ADMIN, UserRole.MANAGER}:
        raise HTTPException(status_code=403, detail="Not authorized")
    return messages.update(db, message_id, message_in)

@router.delete("/messages/{message_id}")
def delete_message(
    message_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_admin_or_self),
):
    message = messages.get(db, message_id)
    if not message:
        raise HTTPException(status_code=404, detail="Message not found")
    if current_user.id != message.sender_id and current_user.role not in {UserRole.ADMIN, UserRole.MANAGER}:
        raise HTTPException(status_code=403, detail="Not authorized")
    if not messages.delete(db, message_id):
        raise HTTPException(status_code=404, detail="Message not found")
    return {"detail": "Message deleted"}

@router.get("/messages/sent/", response_model=List[Message])
def get_sent_messages(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_active_user),
    skip: int = 0,
    limit: int = 100,
):
    return messages.get_by_sender(db, current_user.id, skip, limit)

@router.get("/messages/received/", response_model=List[Message])
def get_received_messages(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_active_user),
    skip: int = 0,
    limit: int = 100,
):
    return messages.get_by_receiver(db, current_user.id, skip, limit)