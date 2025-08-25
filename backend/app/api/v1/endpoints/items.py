from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.db.session import get_db
from app.models.schemas import Item, ItemCreate
from app import crud
from app.api.deps import get_current_active_user
from app.models.user import User

router = APIRouter()


@router.get("/", response_model=list[Item])
def read_items(
    skip: int = 0,
    limit: int = 100,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_active_user),
):
    items = crud.item.get_multi(db, skip=skip, limit=limit)
    return items


@router.post("/", response_model=Item)
def create_item(
    item: ItemCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_active_user),
):
    return crud.item.create(db=db, item_in=item, owner_id=current_user.id)


@router.get("/{item_id}", response_model=Item)
def read_item(
    item_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_active_user),
):
    item = crud.item.get(db, item_id=item_id)
    if item is None:
        raise HTTPException(status_code=404, detail="Item not found")
    return item


@router.get("/my/items", response_model=list[Item])
def read_my_items(
    skip: int = 0,
    limit: int = 100,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_active_user),
):
    # Example: Get only current user's items
    items = (
        db.query(crud.item.model)
        .filter(crud.item.model.owner_id == current_user.id)
        .offset(skip)
        .limit(limit)
        .all()
    )
    return items
