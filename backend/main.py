from fastapi import FastAPI 
from course.router import router as course_router


# Initialize FastAPI application
app = FastAPI(
    title="SkillSphere API"
)

app.include_router(course_router)

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)