from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.models.schemas import UserCreate, UserUpdate, UserInDB
from app.services.user import UserService
from app.database.session import get_db
from app.core.security import get_current_user

router = APIRouter()


@router.post("/", response_model=UserInDB)
def create_user(user: UserCreate, db: Session = Depends(get_db)):
    service = UserService(db)
    db_user = service.get_user_by_username(user.username)
    if db_user:
        raise HTTPException(status_code=400, detail="Username already registered")
    return service.create_user(user)


@router.get("/{user_id}", response_model=UserInDB)
def read_user(user_id: int, db: Session = Depends(get_db)):
    service = UserService(db)
    db_user = service.get_user(user_id)
    if not db_user:
        raise HTTPException(status_code=404, detail="User not found")
    return db_user


@router.put("/{user_id}", response_model=UserInDB)
def update_user(
    user_id: int,
    user_update: UserUpdate,
    db: Session = Depends(get_db),
    current_user: UserInDB = Depends(get_current_user),
):
    if current_user.id != user_id:
        raise HTTPException(
            status_code=403, detail="Not authorized to update this user"
        )

    service = UserService(db)
    updated_user = service.update_user(user_id, user_update)
    if not updated_user:
        raise HTTPException(status_code=404, detail="User not found")
    return updated_user


@router.delete("/{user_id}")
def delete_user(
    user_id: int,
    db: Session = Depends(get_db),
    current_user: UserInDB = Depends(get_current_user),
):
    if current_user.id != user_id:
        raise HTTPException(
            status_code=403, detail="Not authorized to delete this user"
        )

    service = UserService(db)
    success = service.delete_user(user_id)
    if not success:
        raise HTTPException(status_code=404, detail="User not found")
    return {"message": "User deactivated"}
