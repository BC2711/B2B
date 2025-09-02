from sqlalchemy.orm import Session
from sqlalchemy.exc import DatabaseError, IntegrityError
from fastapi import HTTPException, status
from app.models.user import User, UserRole, UserStatus
from app.models.schemas.user import UserCreate
from app.core.security import get_password_hash, verify_password
from typing import Optional, List


class CRUDUser:
    # def authenticate(db: Session, email: str, password: str):
        # try:
        #     user = db.query(User).filter(User.email == email).first()
        #     if not user:
        #         raise HTTPException(
        #             status_code=status.HTTP_401_UNAUTHORIZED,
        #             detail="Incorrect email or password",
        #             headers={"WWW-Authenticate": "Bearer"},
        #         )
        #     if not verify_password(password, user.hashed_password):
        #         raise HTTPException(
        #             status_code=status.HTTP_401_UNAUTHORIZED,
        #             detail="Incorrect email or password",
        #             headers={"WWW-Authenticate": "Bearer"},
        #         )
        #     return user
        # except IntegrityError:
        #     raise HTTPException(
        #         status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
        #         detail="Database integrity error occurred",
        #     )
        # except DatabaseError as e:
        #     raise HTTPException(
        #         status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
        #         detail="A database error occurred. Please try again later.",
        #     )
        # except Exception as e:
        #     raise HTTPException(
        #         status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
        #         detail="An unexpected error occurred",
        #     )

    def authenticate(self, db: Session, email: str, password: str) -> Optional[User]:
        user = self.get_by_email(db, email=email)
        if not user or not verify_password(password, user.hashed_password):
            return None
        return user

    def get_all_users(self, db: Session, skip: int = 0, limit: int = 100) -> List[User]:
        return db.query(User).offset(skip).limit(min(limit, 100)).all()

    def get_by_email(self, db: Session, email: str) -> Optional[User]:
        return db.query(User).filter(User.email == email).first()

    def get(self, db: Session, user_id: int) -> Optional[User]:
        return db.query(User).filter(User.id == user_id).first()

    def create(
        self, db: Session, user_in: UserCreate, created_by: Optional[int] = None
    ) -> User:
        try:
            hashed_password = get_password_hash(user_in.password)
            db_user = User(
                email=user_in.email,
                first_name=user_in.first_name,
                last_name=user_in.last_name,
                phone_number=user_in.phone_number,
                hashed_password=hashed_password,
                created_by=created_by,
                updated_by=created_by,
            )
            db.add(db_user)
            db.commit()
            db.refresh(db_user)
            return db_user
        except IntegrityError as e:
            db.rollback()
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Email or phone number already exists",
            )

    def update(
        self,
        db: Session,
        user_id: int,
        user_in: UserCreate,
        updated_by: Optional[int] = None,
    ) -> Optional[User]:
        db_user = self.get(db, user_id)
        if not db_user:
            return None
        try:
            db_user.email = user_in.email
            db_user.first_name = user_in.first_name
            db_user.last_name = user_in.last_name
            db_user.phone_number = user_in.phone_number
            db_user.hashed_password = get_password_hash(user_in.password)
            db_user.updated_by = updated_by
            db.commit()
            db.refresh(db_user)
            return db_user
        except IntegrityError as e:
            db.rollback()
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Email or phone number already exists",
            )

    def delete(self, db: Session, user_id: int) -> bool:
        db_user = self.get(db, user_id)
        if not db_user:
            return False
        db.delete(db_user)
        db.commit()
        return True

    def update_status(
        self,
        db: Session,
        user_id: int,
        status: UserStatus,
        updated_by: Optional[int] = None,
    ) -> Optional[User]:
        db_user = self.get(db, user_id)
        if not db_user:
            return None
        db_user.status = status
        db_user.updated_by = updated_by
        db.commit()
        db.refresh(db_user)
        return db_user

    def update_role(
        self,
        db: Session,
        user_id: int,
        role: UserRole,
        updated_by: Optional[int] = None,
    ) -> Optional[User]:
        db_user = self.get(db, user_id)
        if not db_user:
            return None
        db_user.role = role
        db_user.updated_by = updated_by
        db.commit()
        db.refresh(db_user)
        return db_user


user = CRUDUser()
