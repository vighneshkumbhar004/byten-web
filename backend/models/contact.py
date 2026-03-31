from pydantic import BaseModel, EmailStr, Field
from datetime import datetime
from typing import Optional
import uuid


class ContactSubmission(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    email: EmailStr
    company: str
    phone: Optional[str] = None
    message: Optional[str] = None
    submission_type: str = "contact"  # "contact", "demo", "newsletter"
    created_at: datetime = Field(default_factory=datetime.utcnow)
    status: str = "new"  # "new", "contacted", "converted", "closed"


class ContactSubmissionCreate(BaseModel):
    name: str
    email: EmailStr
    company: str
    phone: Optional[str] = None
    message: Optional[str] = None
    submission_type: str = "contact"


class DemoRequest(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    email: EmailStr
    source: str  # "navbar", "hero", "footer"
    created_at: datetime = Field(default_factory=datetime.utcnow)
    status: str = "pending"


class DemoRequestCreate(BaseModel):
    email: EmailStr
    source: str = "navbar"
