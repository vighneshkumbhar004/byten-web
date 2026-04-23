from fastapi import APIRouter, HTTPException
from ..models.contact import ContactSubmission, ContactSubmissionCreate, DemoRequest, DemoRequestCreate, NewsletterSubscription, NewsletterSubscriptionCreate
from motor.motor_asyncio import AsyncIOMotorClient
from typing import List
import os

router = APIRouter()

# Helper function to get DB
def get_db():
    mongo_url = os.environ.get('MONGO_URL')
    if not mongo_url:
        # For local dev if not set
        mongo_url = "mongodb://localhost:27017" # Fallback
    db_name = os.environ.get('DB_NAME', 'byten_landing')
    client = AsyncIOMotorClient(mongo_url)
    return client, client[db_name]

@router.post("/contact/submit", response_model=ContactSubmission)
async def submit_contact_form(submission: ContactSubmissionCreate):
    client, db = get_db()
    try:
        contact_obj = ContactSubmission(**submission.dict())
        result = await db.contact_submissions.insert_one(contact_obj.dict())
        if result.inserted_id:
            return contact_obj
        raise HTTPException(status_code=500, detail="Failed to save submission")
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
    finally:
        client.close()

@router.post("/demo/request", response_model=DemoRequest)
async def request_demo(demo_request: DemoRequestCreate):
    client, db = get_db()
    try:
        demo_obj = DemoRequest(**demo_request.dict())
        result = await db.demo_requests.insert_one(demo_obj.dict())
        if result.inserted_id:
            return demo_obj
        raise HTTPException(status_code=500, detail="Failed to save demo request")
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
    finally:
        client.close()

@router.post("/newsletter/subscribe", response_model=NewsletterSubscription)
async def subscribe_newsletter(subscription: NewsletterSubscriptionCreate):
    client, db = get_db()
    try:
        # Check if already subscribed
        existing = await db.newsletter_subscriptions.find_one({"email": subscription.email})
        if existing:
            return NewsletterSubscription(**existing)
            
        sub_obj = NewsletterSubscription(**subscription.dict())
        result = await db.newsletter_subscriptions.insert_one(sub_obj.dict())
        if result.inserted_id:
            return sub_obj
        raise HTTPException(status_code=500, detail="Failed to subscribe")
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
    finally:
        client.close()

@router.get("/contact/submissions", response_model=List[ContactSubmission])
async def get_all_submissions():
    client, db = get_db()
    try:
        submissions = await db.contact_submissions.find().sort("created_at", -1).to_list(1000)
        return [ContactSubmission(**s) for s in submissions]
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
    finally:
        client.close()

@router.get("/demo/requests", response_model=List[DemoRequest])
async def get_all_demo_requests():
    client, db = get_db()
    try:
        requests = await db.demo_requests.find().sort("created_at", -1).to_list(1000)
        return [DemoRequest(**r) for r in requests]
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
    finally:
        client.close()

@router.get("/stats")
async def get_submission_stats():
    client, db = get_db()
    try:
        total_contacts = await db.contact_submissions.count_documents({})
        total_demos = await db.demo_requests.count_documents({})
        total_subs = await db.newsletter_subscriptions.count_documents({})
        return {
            "total_contact_submissions": total_contacts,
            "total_demo_requests": total_demos,
            "total_newsletter_subscribers": total_subs,
            "total_leads": total_contacts + total_demos
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
    finally:
        client.close()
