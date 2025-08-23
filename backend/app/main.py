from fastapi import FastAPI
from app.api.v1.api import api_router
from app.core.config import settings
from app.db.session import engine, Base

# Create database tables
Base.metadata.create_all(bind=engine)

app = FastAPI(title=settings.PROJECT_NAME)

# Simple test endpoint
@app.get("/")
def root():
    return {"message": "Hello World", "status": "Database connected successfully"}

# You can comment out the API router temporarily

app.include_router(api_router, prefix=settings.API_V1_STR)