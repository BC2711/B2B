from fastapi import APIRouter, Depends, HTTPException, status, Response
from fastapi.security import OAuth2PasswordRequestForm
from sqlalchemy.orm import Session
from datetime import timedelta
from app.db.session import get_db
from app import crud
from app.core.security import create_access_token
from app.core.config import settings
from app.models.schemas.user import Token, UserLogin

router = APIRouter(tags=["auth"])


@router.post("/login")
def login(
    response: Response,
    db: Session = Depends(get_db),
    form_data: OAuth2PasswordRequestForm = Depends(),
):
    user = crud.user.authenticate(
        db, email=form_data.username, password=form_data.password
    )
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect email or password",
            headers={"WWW-Authenticate": "Bearer"},
        )

    access_token_expires = timedelta(minutes=settings.ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = create_access_token(
        data={"sub": user.email}, expires_delta=access_token_expires
    )

    # Set HTTP-only cookie
    response.set_cookie(
        key="authToken",
        value=access_token,
        max_age=int(access_token_expires.total_seconds()),
        httponly=True,
        secure=True,
        samesite="strict",
    )

    # Return user data
    return {"access_token": access_token, "token_type": "bearer", "data": user}


@router.post("/login-json")
def login_json(
    response: Response, user_login: UserLogin, db: Session = Depends(get_db)
):
    user = crud.user.authenticate(
        db, email=user_login.email, password=user_login.password
    )
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect email or password",
            headers={"WWW-Authenticate": "Bearer"},
        )

    access_token_expires = timedelta(minutes=settings.ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = create_access_token(
        data={"sub": user.email}, expires_delta=access_token_expires
    )

    # Set HTTP-only cookie
    response.set_cookie(
        key="authToken",
        value=access_token,
        max_age=int(access_token_expires.total_seconds()),
        httponly=True,
        secure=True,
        samesite="strict",
    )

    # Return user data
    return {"access_token": access_token, "token_type": "bearer", "data": user}


@router.post("/logout")
def logout(response: Response):
    # Clear the authToken cookie
    response.delete_cookie(
        key="authToken",
        httponly=True,
        secure=True,
        samesite="strict",
    )
    return {"message": "Successfully logged out"}
