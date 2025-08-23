from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app import crud, models
from app.models import schemas
from app.db.session import get_db

router = APIRouter()


@router.get("/", response_model=list[schemas.Item])
def read_items(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    items = crud.item.get_multi(db, skip=skip, limit=limit)
    return items


@router.post("/", response_model=schemas.Item)
def create_item(item: schemas.ItemCreate, db: Session = Depends(get_db)):
    # For now, hardcode owner_id. You'll add authentication later.
    return crud.item.create(db=db, item_in=item, owner_id=1)
