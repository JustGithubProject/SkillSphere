from sqlalchemy.ext.asyncio import AsyncSession
from authentication.custom_exceptions import not_enough_rights_exception
from authentication.schemas import UserOut
from utils import check_is_user_a_course_staff
from repositories.user_repository import UserRepository
from repositories.course_repository import CourseRepository
from database.models import Course, User
from course.schemas import CourseInput, CourseOutput, CourseUpdate


class CourseService:
    def __init__(self, course_repository: CourseRepository, user_repository: UserRepository):
        """
        Initialize the course service with a course and user repository.
        """
        self.course_repository = course_repository
        self.user_repository = user_repository

    async def check_is_course_exists(
        self,
        session: AsyncSession,
        course_id: int,
        user: UserOut
    ) -> bool:
        course: Course | None = await self.course_repository.get_course_by_id(
            session=session,
            course_id=course_id
        )
        if course and await check_is_user_a_course_staff(
            user=user, 
            creator_id=course.creator_id,
            instructors=course.instructors
        ):
            return True
        return False

    async def get_all_courses(
        self, 
        session: AsyncSession, 
        skip: int,
        limit: int,
        user: UserOut,
        **kwargs,
    ) -> list[CourseOutput]:
        courses: list[Course] = await self.course_repository.get_all_courses(
            **kwargs,
            session=session, 
            skip=skip,
            limit=limit,
            is_admin=user.admin
        )
        return [
            CourseOutput.model_validate(course, from_attributes=True) 
            for course in courses
        ]
    
    async def fetch_all_courses_no_auth(
        self,
        session: AsyncSession,
        limit: int
    ) -> list[CourseOutput]:
        """
            Method to get courses without auth 
        """
        courses: list[Course] = await self.course_repository.fetch_all_courses_no_auth(
            session=session,
            limit=limit
        )
        
        return [
            CourseOutput.model_validate(course, from_attributes=True) 
            for course in courses
        ]

    
    async def create_course(
        self,
        course_input: CourseInput,
        session: AsyncSession,
        user: UserOut
    ) -> CourseOutput:
        course: Course = await self.course_repository.create_course(
            session=session,
            course_input=course_input,
            creator_id=user.id,
        )
        return CourseOutput.model_validate(course, from_attributes=True)
    
    async def get_course_by_id(
        self,
        session: AsyncSession,
        course_id: int,
        user: UserOut
    ) -> CourseOutput:
        course: Course = await self.course_repository.get_course_by_id(
            session=session,
            course_id=course_id
        )
        is_staff: bool = await check_is_user_a_course_staff(
            user=user, 
            creator_id=course.creator_id,
            instructors=course.instructors
        )
        if course.is_published or is_staff:
            return CourseOutput.model_validate(course, from_attributes=True)
        
    async def update_course(
        self,
        session: AsyncSession,
        course_update: CourseUpdate,
        course_id: int,
        user: UserOut,
    ) -> CourseOutput:
        course: Course = await self.course_repository.get_course_by_id(
            session=session,
            course_id=course_id
        )
        if user.admin or user.id == course.creator_id:
            course: Course = await self.course_repository.update_course(
                session=session,
                course_update=course_update,
                course=course,
            )
            return CourseOutput.model_validate(course, from_attributes=True)
        raise not_enough_rights_exception

    async def delete_course(
        self,
        session: AsyncSession,
        course_id: int,
        user: UserOut,
    ) -> None:
        course: Course = await session.get(Course, course_id)
        if user.admin or user.id == course.creator_id:
            return await self.course_repository.delete_course(
                session=session,
                course=course
            )
        raise not_enough_rights_exception

    async def add_instructor(
        self,
        session: AsyncSession,
        user: UserOut,
        instructor_id: int,
        course_id: int
    ) -> CourseOutput:
        course: Course = await self.course_repository.get_course_by_id(
            session=session,
            course_id=course_id
        )
        instructor: User = await self.user_repository.get_instructor_by_id(
            session=session,
            user_id=instructor_id
        )
        if user.admin or user.id == course.creator_id:
            updated_course: Course = await self.course_repository.add_instructor(
                session=session,
                course=course,
                instructor=instructor
            )
            return updated_course
        raise not_enough_rights_exception

def get_course_service():
    return CourseService(CourseRepository(), UserRepository()) 