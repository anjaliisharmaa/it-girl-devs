"""
Main FastAPI application - Entry point for the It-Girl Devs backend.
"""

import os
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv
from app.api import evaluator

# Load environment variables
load_dotenv()

# Create FastAPI app
app = FastAPI(
    title="It-Girl Devs API",
    description="AI-powered code evaluation backend for It-Girl Devs learning platform",
    version="0.1.0"
)

# CORS configuration
allowed_origins = os.getenv("ALLOWED_ORIGINS", "http://localhost:3000").split(",")

app.add_middleware(
    CORSMiddleware,
    allow_origins=allowed_origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers
app.include_router(evaluator.router)


@app.get("/", tags=["health"])
async def root():
    """
    Health check endpoint.
    
    Returns:
        Dictionary with API status
    """
    return {
        "status": "healthy",
        "service": "It-Girl Devs API",
        "version": "0.1.0"
    }


@app.get("/health", tags=["health"])
async def health_check():
    """
    Health check endpoint for monitoring.
    
    Returns:
        Dictionary with health status
    """
    return {
        "status": "ok",
        "service": "It-Girl Devs API"
    }


if __name__ == "__main__":
    import uvicorn
    uvicorn.run(
        "main:app",
        host="0.0.0.0",
        port=8000,
        reload=True
    )
