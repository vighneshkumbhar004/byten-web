from pydantic import BaseModel, Field
from datetime import datetime
from typing import Optional
import uuid


class ChatMessage(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    message: str
    type: str  # "user" or "bot"
    session_id: Optional[str] = None
    created_at: datetime = Field(default_factory=datetime.utcnow)


class ChatMessageCreate(BaseModel):
    message: str
    type: str = "user"
    session_id: Optional[str] = None
