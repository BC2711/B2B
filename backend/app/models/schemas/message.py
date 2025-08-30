from pydantic import BaseModel
from pydantic.types import StringConstraints
from typing import Optional, List, Annotated
from datetime import datetime
from .user import User

class MessageBase(BaseModel):
    message: Annotated[str, StringConstraints(min_length=1, max_length=1000)]

class MessageCreate(BaseModel):
    message: Annotated[str, StringConstraints(min_length=1, max_length=1000)]
    receiver_id: int

class MessageUpdate(BaseModel):
    message: Optional[Annotated[str, StringConstraints(min_length=1, max_length=1000)]] = None
    receiver_id: Optional[int] = None

class Message(MessageBase):
    id: int
    sender: User
    receiver: User
    date_time_sent: datetime

    class Config:
        from_attributes = True