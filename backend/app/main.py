from fastapi import FastAPI
from sqlalchemy.exc import IntegrityError
from app.core.config import settings
from app.api.v1.api import api_router
from app.db.session import engine, Base, SessionLocal
from app.models.user import User
from app.models.schemas.user import UserCreate
from app.crud.user import user as user_crud
from app.core.security import get_password_hash

# Create database tables
Base.metadata.create_all(bind=engine)

# Create default user if none exists
def create_default_user():
    db = SessionLocal()
    try:
        # Check if any users exist
        if not db.query(User).first():
            # Create default user
            default_user = UserCreate(
                email="admin@example.com",
                first_name="Biness",
                last_name="Chama",
                phone_number="0965508033",
                password="adminpassword",
            )
            user = user_crud.create(db, user_in=default_user)
            # Set status and role explicitly
            user.status = "ACTIVE"
            user.role = "ADMIN"
            db.commit()
            db.refresh(user)
            print("Default user created: admin@example.com / adminpassword")
    except IntegrityError:
        db.rollback()
        print("Default user creation failed: Email or phone number already exists")
    finally:
        db.close()

app = FastAPI(
    title=settings.PROJECT_NAME, openapi_url=f"{settings.API_V1_STR}/openapi.json"
)

# Include the API router
app.include_router(api_router, prefix=settings.API_V1_STR)

@app.on_event("startup")
def startup_event():  # Changed to synchronous
    create_default_user()

@app.get("/")
def root():
    return {"message": "Hello World", "status": "Database connected successfully"}