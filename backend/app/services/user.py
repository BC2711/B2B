from sqlalchemy.orm import Session
from app.models.user import User
from app.models.schemas import UserCreate, UserUpdate
from app.core.security import get_password_hash


class UserService:
    def __init__(self, db: Session):
        self.db = db

    def create_user(self, user: UserCreate):
        hashed_password = get_password_hash(user.password)
        db_user = User(
            username=user.username,
            email=user.email,
            hashed_password=hashed_password,
            full_name=user.full_name,
        )
        self.db.add(db_user)
        self.db.commit()
        self.db.refresh(db_user)
        return db_user

    def get_user(self, user_id: int):
        return self.db.query(User).filter(User.id == user_id).first()

    def get_user_by_username(self, username: str):
        return self.db.query(User).filter(User.username == username).first()

    def update_user(self, user_id: int, user_update: UserUpdate):
        db_user = self.get_user(user_id)
        if not db_user:
            return None

        if user_update.email:
            db_user.email = user_update.email
        if user_update.full_name:
            db_user.full_name = user_update.full_name
        if user_update.password:
            db_user.hashed_password = get_password_hash(user_update.password)

        self.db.commit()
        self.db.refresh(db_user)
        return db_user

    def delete_user(self, user_id: int):
        db_user = self.get_user(user_id)
        if not db_user:
            return False

        # Soft delete (set inactive)
        db_user.is_active = False
        self.db.commit()
        return True
