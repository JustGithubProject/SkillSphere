from sqlalchemy.ext.asyncio import AsyncSession

from repositories.course_repository import CourseRepository
from database.models import Course
from course.schemas import CourseInput, CourseOutput, CourseUpdate


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
    
    async def create_course(
        self,
        course_input: CourseInput,
        session: AsyncSession
    ) -> CourseOutput:
        course: Course = await self.course_repository.create_course(
            session=session,
            course_input=course_input
        )
        return CourseOutput.model_validate(course, from_attributes=True)
    
    async def get_course_by_id(
        self,
        session: AsyncSession,
        course_id: int
    ) -> CourseOutput:
        course: Course = await self.course_repository.get_course_by_id(
            session=session,
            course_id=course_id
        )
        return CourseOutput.model_validate(course, from_attributes=True)
    
    async def update_course(
        self,
        session: AsyncSession,
        course_update: CourseUpdate,
        course_id: int
    ) -> CourseOutput:
        course: Course = await self.course_repository.update_course(
            session=session,
            course_update=course_update,
            course_id=course_id,
        )
        return CourseOutput.model_validate(course, from_attributes=True)

    async def delete_course(
        self,
        session: AsyncSession,
        course_id: int
    ) -> None:
        return await self.course_repository.delete_course(
            session=session,
            course_id=course_id
        )


def get_course_service():
    return CourseService(CourseRepository()) 