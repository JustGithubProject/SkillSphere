from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from course.router import router as course_router
from authentication.routers import router as authentication_router
from module.router import router as module_router
from contactus.router import router as contactus_router
<<<<<<< HEAD
from comment.router import router as comment_router
=======
from google_auth.router import router as google_router
>>>>>>> 86877f3 (Added google oauth2)


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
<<<<<<< HEAD
    router=comment_router,
    prefix=API_V1_PREFIX
=======
    router=google_router
>>>>>>> 86877f3 (Added google oauth2)
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
    
    
    