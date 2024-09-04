from sqlalchemy.ext.asyncio import AsyncSession

from repositories.course_repository import CourseRepository
from database.models import Course
from course.schemas import CourseOutput


class CourseService:
    def __init__(self, course_repository: CourseRepository):
        """
        Initialize the course service with a course repository.
        """
        self.course_repository = course_repository
        
    async def get_all_courses(
            self, 
            session: AsyncSession, 
            skip: int,
            limit: int,
            **kwargs,
        ) -> list[CourseOutput]:
            courses: list[Course] = await self.course_repository.get_all_courses(
                **kwargs,
                session=session, 
                skip=skip,
                limit=limit,
            )
            return [
                CourseOutput.model_validate(course, from_attributes=True) 
                for course in courses
            ]
    

def get_course_service():
    return CourseService(CourseRepository()) 