from sqlalchemy.orm import Session
from app.models.user import User
from app.models.schemas import UserCreate
from app.core.security import get_password_hash, verify_password


class CRUDUser:
    def get_all_users(self, db: Session, skip: int = 0, limit: int = 100):
        return db.query(User).offset(skip).limit(limit).all()

    def get_by_email(self, db: Session, email: str):
        return db.query(User).filter(User.email == email).first()

    def create(self, db: Session, user_in: UserCreate):
        hashed_password = get_password_hash(user_in.password)
        db_user = User(
            email=user_in.email,
            first_name=user_in.first_name,
            last_name=user_in.last_name,
            phone_number=user_in.phone_number,
            hashed_password=hashed_password,
        )
        db.add(db_user)
        db.commit()
        db.refresh(db_user)
        return db_user

    def get(self, db: Session, user_id: int):
        return db.query(User).filter(User.id == user_id).first()

    def authenticate(self, db: Session, email: str, password: str):
        user = self.get_by_email(db, email=email)
        if not user:
            return None
        if not verify_password(password, user.hashed_password):
            return None
        return user


user = CRUDUser()
