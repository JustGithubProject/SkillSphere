from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from course.router import router as course_router
from authentication.routers import router as authentication_router


# Initialize FastAPI application
app = FastAPI(
    title="SkillSphere API",
)

app.include_router(
    router=course_router,
    prefix="/api/v1"
)

app.include_router(
    router=authentication_router,
    prefix="/api/v1"
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