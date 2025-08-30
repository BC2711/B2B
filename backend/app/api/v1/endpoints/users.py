from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.db.session import get_db
from app.models.schemas.user import User, UserCreate
from app import crud
from app.api.deps import get_current_active_user

router = APIRouter()


@router.get("/", response_model=list[User])
def list_users(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    users = crud.user.get_all_users(db, skip=skip, limit=limit)
    if users is None:
        raise HTTPException(status_code=404, detail="Users not found")
    return users


@router.post("/", response_model=User)
def create_user(user: UserCreate, db: Session = Depends(get_db)):
    db_user = crud.user.get_by_email(db, email=user.email)
    if db_user:
        raise HTTPException(status_code=400, detail="Email already registered")
    return crud.user.create(db=db, user_in=user)


@router.get("/{user_id}", response_model=User)
def read_user(
    user_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_active_user),
):
    db_user = crud.user.get(db, user_id=user_id)
    if db_user is None:
        raise HTTPException(status_code=404, detail="User not found")
    return db_user


@router.get("/me/", response_model=User)
def read_users_me(current_user: User = Depends(get_current_active_user)):
    return current_user
