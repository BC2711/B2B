from fastapi import Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer
from app.models.schemas import UserInDB
from app.services.user import UserService
from app.database.session import get_db
from app.core.security import verify_token

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="auth/login")


async def get_current_user(
    token: str = Depends(oauth2_scheme), db: Session = Depends(get_db)
):
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )
    token_data = verify_token(token)
    if not token_data:
        raise credentials_exception

    service = UserService(db)
    user = service.get_user_by_username(token_data.username)
    if not user:
        raise credentials_exception
    return user
