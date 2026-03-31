from fastapi import APIRouter, HTTPException
from models.chat import ChatMessage, ChatMessageCreate
from motor.motor_asyncio import AsyncIOMotorClient
from typing import List
import os

router = APIRouter()

# MongoDB connection
mongo_url = os.environ.get('MONGO_URL')
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ.get('DB_NAME', 'byten_landing')]


@router.post("/chat/message", response_model=ChatMessage)
async def save_chat_message(message: ChatMessageCreate):
    """
    Save chat messages for analytics and future AI training
    """
    try:
        chat_obj = ChatMessage(**message.dict())
        result = await db.chat_messages.insert_one(chat_obj.dict())
        
        if result.inserted_id:
            return chat_obj
        else:
            raise HTTPException(status_code=500, detail="Failed to save message")
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error saving message: {str(e)}")


@router.get("/chat/messages", response_model=List[ChatMessage])
async def get_chat_messages(session_id: str = None, limit: int = 100):
    """
    Retrieve chat messages (for admin or session replay)
    """
    try:
        query = {"session_id": session_id} if session_id else {}
        messages = await db.chat_messages.find(query).sort("created_at", -1).limit(limit).to_list(limit)
        return [ChatMessage(**msg) for msg in messages]
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error retrieving messages: {str(e)}")


@router.get("/chat/stats")
async def get_chat_stats():
    """
    Get chatbot usage statistics
    """
    try:
        total_messages = await db.chat_messages.count_documents({})
        user_messages = await db.chat_messages.count_documents({"type": "user"})
        bot_messages = await db.chat_messages.count_documents({"type": "bot"})
        
        return {
            "total_messages": total_messages,
            "user_messages": user_messages,
            "bot_messages": bot_messages,
            "conversations": user_messages // 2  # Rough estimate
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error retrieving stats: {str(e)}")
