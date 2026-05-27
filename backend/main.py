"""
Main FastAPI application - Entry point for the It-Girl Devs backend.
"""

import os
import sys
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

from app.api import evaluator

# Create FastAPI app
app = FastAPI(
    title="It-Girl Devs API",
    description="AI-powered code evaluation backend for It-Girl Devs learning platform",
    version="0.1.0"
)

# CORS configuration - Allow localhost on all ports for development
allowed_origins = [
    "http://localhost:3000",
    "http://localhost:3001",
    "http://localhost:3002",
    "http://localhost:3003",
    "http://localhost:8000",
    "http://127.0.0.1:3000",
    "http://127.0.0.1:3001",
    "http://127.0.0.1:3002",
    "http://127.0.0.1:3003",
    "https://it-girl-devs.vercel.app",
]
# Also allow custom origins from environment variable if provided
custom_origins = os.getenv("ALLOWED_ORIGINS")
if custom_origins:
    allowed_origins.extend(custom_origins.split(","))

print(f"[DEBUG] Allowed origins: {allowed_origins}", file=sys.stderr)
print(f"[DEBUG] GEMINI_API_KEY set: {bool(os.getenv('GEMINI_API_KEY'))}", file=sys.stderr)

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
        reload=False
    )
