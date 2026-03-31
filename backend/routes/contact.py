from fastapi import APIRouter, HTTPException
from models.contact import ContactSubmission, ContactSubmissionCreate, DemoRequest, DemoRequestCreate
from motor.motor_asyncio import AsyncIOMotorClient
from typing import List
import os

router = APIRouter()

# MongoDB connection
mongo_url = os.environ.get('MONGO_URL')
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ.get('DB_NAME', 'byten_landing')]


@router.post("/contact/submit", response_model=ContactSubmission)
async def submit_contact_form(submission: ContactSubmissionCreate):
    """
    Handle contact form submissions from the landing page
    """
    try:
        contact_obj = ContactSubmission(**submission.dict())
        result = await db.contact_submissions.insert_one(contact_obj.dict())
        
        if result.inserted_id:
            return contact_obj
        else:
            raise HTTPException(status_code=500, detail="Failed to save submission")
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error processing submission: {str(e)}")


@router.post("/demo/request", response_model=DemoRequest)
async def request_demo(demo_request: DemoRequestCreate):
    """
    Handle demo requests from CTA buttons
    """
    try:
        demo_obj = DemoRequest(**demo_request.dict())
        result = await db.demo_requests.insert_one(demo_obj.dict())
        
        if result.inserted_id:
            return demo_obj
        else:
            raise HTTPException(status_code=500, detail="Failed to save demo request")
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error processing demo request: {str(e)}")


@router.get("/contact/submissions", response_model=List[ContactSubmission])
async def get_all_submissions():
    """
    Retrieve all contact submissions (admin endpoint)
    """
    try:
        submissions = await db.contact_submissions.find().sort("created_at", -1).to_list(1000)
        return [ContactSubmission(**submission) for submission in submissions]
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error retrieving submissions: {str(e)}")


@router.get("/demo/requests", response_model=List[DemoRequest])
async def get_all_demo_requests():
    """
    Retrieve all demo requests (admin endpoint)
    """
    try:
        requests = await db.demo_requests.find().sort("created_at", -1).to_list(1000)
        return [DemoRequest(**request) for request in requests]
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error retrieving demo requests: {str(e)}")


@router.get("/stats")
async def get_submission_stats():
    """
    Get statistics about submissions and demo requests
    """
    try:
        total_contacts = await db.contact_submissions.count_documents({})
        total_demos = await db.demo_requests.count_documents({})
        
        return {
            "total_contact_submissions": total_contacts,
            "total_demo_requests": total_demos,
            "total_leads": total_contacts + total_demos
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error retrieving stats: {str(e)}")
