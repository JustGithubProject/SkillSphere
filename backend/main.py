from fastapi import FastAPI 
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

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)