from fastapi import FastAPI, APIRouter
from starlette.middleware.cors import CORSMiddleware
import os

# Import routes
from .routes.contact import router as contact_router

app = FastAPI(title="Byten Geomapping API", version="1.0.0")

# Create a router with the /api prefix
api_router = APIRouter(prefix="/api")

@api_router.get("/")
async def root():
    return {
        "message": "Byten Geomapping Technologies API",
        "status": "operational",
        "version": "1.0.0"
    }

@api_router.get("/health")
async def health_check():
    return {
        "status": "healthy"
    }

# Include contact routes
api_router.include_router(contact_router, tags=["Contact & Demo"])

# Include the router in the main app
app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)
