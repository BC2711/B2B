# app/core/cors.py
from fastapi.middleware.cors import CORSMiddleware
from fastapi import FastAPI
from .config import settings

def setup_cors(app: FastAPI):
    """Configure CORS middleware with proper settings"""
    
    print(f"🔄 Configuring CORS with origins: {settings.CORS_ORIGINS}")
    
    app.add_middleware(
        CORSMiddleware,
        allow_origins=settings.CORS_ORIGINS,
        allow_credentials=True,
        allow_methods=["GET", "POST", "PUT", "DELETE", "OPTIONS", "PATCH"],
        allow_headers=["*"],
        expose_headers=["*"],
        max_age=600,
    )