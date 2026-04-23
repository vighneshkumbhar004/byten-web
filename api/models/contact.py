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
    submission_type: str = "contact"
    created_at: datetime = Field(default_factory=datetime.utcnow)
    status: str = "new"


class ContactSubmissionCreate(BaseModel):
    name: str
    email: EmailStr
    company: str
    phone: Optional[str] = None
    message: Optional[str] = None
    submission_type: str = "contact"


class DemoRequest(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    fullName: Optional[str] = None
    email: EmailStr
    phone: Optional[str] = None
    company: Optional[str] = None
    jobTitle: Optional[str] = None
    industry: Optional[str] = None
    companySize: Optional[str] = None
    projectType: Optional[str] = None
    budget: Optional[str] = None
    timeline: Optional[str] = None
    specificRequirements: Optional[str] = None
    source: str = "navbar_detailed"
    created_at: datetime = Field(default_factory=datetime.utcnow)
    status: str = "pending"


class DemoRequestCreate(BaseModel):
    fullName: Optional[str] = None
    email: EmailStr
    phone: Optional[str] = None
    company: Optional[str] = None
    jobTitle: Optional[str] = None
    industry: Optional[str] = None
    companySize: Optional[str] = None
    projectType: Optional[str] = None
    budget: Optional[str] = None
    timeline: Optional[str] = None
    specificRequirements: Optional[str] = None
    source: str = "navbar_detailed"


class NewsletterSubscription(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    email: EmailStr
    subscribed_at: datetime = Field(default_factory=datetime.utcnow)
    status: str = "active"


class NewsletterSubscriptionCreate(BaseModel):
    email: EmailStr
