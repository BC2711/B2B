# main.py (or app/main.py)
from fastapi import FastAPI
from sqlalchemy.exc import DatabaseError, IntegrityError
from fastapi.responses import JSONResponse
from fastapi import status
from contextlib import asynccontextmanager

from app.core.config import settings
from app.api.v1.api import api_router
from app.db.session import engine, Base, SessionLocal
from app.models.user import User
from app.models.schemas.user import UserCreate
from app.crud.user import user as user_crud
from app.core.security import get_password_hash
from app.core.cors import setup_cors

import logging

logging.basicConfig(level=logging.ERROR)
logger = logging.getLogger(__name__)


@asynccontextmanager
async def lifespan(app: FastAPI):
    # Startup: Create tables and default user
    Base.metadata.create_all(bind=engine)
    create_default_user()
    yield
    # Shutdown: Clean up resources if needed
    pass


app = FastAPI(
    title=settings.PROJECT_NAME,
    openapi_url=f"{settings.API_V1_STR}/openapi.json",
    lifespan=lifespan,  # Use lifespan instead of startup event
)

# Setup CORS first (important!)
setup_cors(app)

# Include the API router
app.include_router(api_router, prefix=settings.API_V1_STR)


@app.exception_handler(DatabaseError)
async def database_error_handler(request, exc: DatabaseError):
    logger.error(f"Database error: {str(exc)}")
    return JSONResponse(
        status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
        content={"detail": "A database error occurred. Please try again later."},
    )


def create_default_user():
    """Create default admin user if none exists"""
    db = SessionLocal()
    try:
        # Check if any users exist
        if not db.query(User).first():
            # Create default user
            default_user_data = UserCreate(
                email="admin@example.com",
                first_name="Biness",
                last_name="Chama",
                phone_number="0965508033",
                password="adminpassword",
            )

            # Use your CRUD function to create user
            user = user_crud.create(db, obj_in=default_user_data)

            # Set additional fields if needed
            user.status = "ACTIVE"
            user.role = "ADMIN"

            db.commit()
            db.refresh(user)
            print("✅ Default admin user created:")
            print(f"   Email: admin@example.com")
            print(f"   Password: adminpassword")

    except IntegrityError as e:
        db.rollback()
        print(
            "⚠️  Default user creation skipped: User already exists or integrity error"
        )
        print(f"   Error: {e}")
    except Exception as e:
        db.rollback()
        print(f"❌ Error creating default user: {e}")
    finally:
        db.close()


@app.get("/")
def root():
    return {
        "message": "Welcome to B2B Platform API",
        "status": "Database connected successfully",
        "version": "1.0.0",
        "docs": f"{settings.API_V1_STR}/docs",
    }


@app.get("/health")
def health_check():
    return {
        "status": "healthy",
        "environment": settings.ENVIRONMENT,
        "cors_origins": settings.CORS_ORIGINS,
    }


if __name__ == "__main__":
    import uvicorn

    uvicorn.run(
        "main:app",
        host="0.0.0.0",
        port=8000,
        reload=settings.ENVIRONMENT == "development",
    )
