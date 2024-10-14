from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from course.router import router as course_router
from authentication.routers import router as authentication_router
from module.router import router as module_router
from contactus.router import router as contactus_router
from comment.router import router as comment_router
from google_auth.router import router as google_router
from paypal.router import router as paypal_router
from stripe_payment.router import router as stripe_router
from lesson.router import router as lesson_router


API_V1_PREFIX = "/api/v1"

# Initialize FastAPI application
app = FastAPI(
    title="SkillSphere API",
)

app.include_router(
    router=course_router,
    prefix=API_V1_PREFIX
)

app.include_router(
    router=authentication_router,
    prefix=API_V1_PREFIX
)

app.include_router(
    router=module_router,
    prefix=API_V1_PREFIX
)

app.include_router(
    router=contactus_router,
    prefix=API_V1_PREFIX
)

app.include_router(
    router=comment_router,
    prefix=API_V1_PREFIX
)

app.include_router(
    router=google_router
)

app.include_router(
    router=paypal_router
)

app.include_router(
    router=stripe_router,
    prefix=API_V1_PREFIX
)

app.include_router(
    router=lesson_router,
    prefix=API_V1_PREFIX
)


# Allowed origins 
origins = [
    "http://172.18.0.4:3000",
    "http://0.0.0.0:3000",
    "http://127.0.0.1:3000",
    "http://localhost:3000"
]

# To allow access from frontend to backend routers
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
    
    
    