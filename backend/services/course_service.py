import logging
from fastapi import UploadFile
from aws.s3_actions import S3Client
from sqlalchemy.ext.asyncio import AsyncSession
from authentication.custom_exceptions import not_enough_rights_exception
from authentication.schemas import UserOut
from constants import COURSE, IMAGES, VIDEOS
from services.mixins.file_action_mixin import FileActionMixin
from enums import CourseLevel
from utils import check_is_user_a_course_staff
from repositories.user_repository import UserRepository
from repositories.course_repository import CourseRepository
from database.models import Course, User
from course.schemas import CourseInput, CourseOutput, CourseUpdate
from sqlalchemy.orm import selectinload


class CourseService(FileActionMixin):
    def __init__(self, course_repository: CourseRepository, user_repository: UserRepository):
        """
        Initialize the course service with a course and user repository.
        """
        self.course_repository = course_repository
        self.user_repository = user_repository

    async def search_courses(
        self,
        session: AsyncSession,
        search: str | None = None,
        is_free: bool = False
    ) -> list[CourseOutput]:
        courses: list[Course] = await self.course_repository.search_courses(
            session=session,
            search=search,
            is_free=is_free
        )

        return [CourseOutput.model_validate(course, from_attributes=True) for course in courses]
    
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
            CourseOutput(**course.__dict__) 
            for course in courses
        ]

    
    async def create_course(
        self,
        title: str,
        description: str,
        price: int,
        level: CourseLevel,
        session: AsyncSession,
        user: UserOut,
        photo_file: str,
        video_file: str,
    ) -> CourseOutput:
        course_input: CourseInput = CourseInput(
            title=title,
            description=description,
            price=price,
            level=level,
            video_url=video_file,
            photo_url=photo_file,
        )
        
        course: Course = await self.course_repository.create_course(
            session=session,
            course_input=course_input,
            creator_id=user.id,
        )
        course_schema: CourseOutput = CourseOutput.model_validate(course, from_attributes=True)
        return course_schema
    
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
    
    async def get_course_by_id_no_auth(
        self,
        session: AsyncSession,
        course_id: int,
    ) -> CourseOutput:
        course: Course = await self.course_repository.get_course_by_id(
            session=session,
            course_id=course_id
        )
        # TODO: course.is_published condition ...
        # if course.is_published:
        #     return CourseOutput.model_validate(course, from_attributes=True)    
        return CourseOutput.model_validate(course, from_attributes=True)
        
        
    async def update_course(
        self,
        session: AsyncSession,
        is_published: bool | None,
        title: str | None,
        description: str | None,
        price: int | None,
        level: CourseLevel | None,
        photo_file: UploadFile | None,
        video_file: UploadFile | None,
        course_id: int,
        user: UserOut,
    ) -> CourseOutput:
        course: Course = await self.course_repository.get_course_by_id(
            session=session,
            course_id=course_id
        )
        video_filename, video_url_key = None, None
        photo_filename, photo_url_key = None, None

        async with S3Client() as s3_client:
            if video_file:
                video_filename, video_url_key = await self._generate_file_key(video_file, VIDEOS, COURSE)
                await self._update_file(s3_client, video_file, course.video_url, video_url_key, VIDEOS)

            if photo_file:
                photo_filename, photo_url_key = await self._generate_file_key(photo_file, IMAGES, COURSE)
                await self._update_file(s3_client, photo_file, course.photo_url, photo_url_key, IMAGES)

        course_update: CourseUpdate = CourseUpdate(
            title=title,
            description=description,
            price=price,
            level=level,
            photo_url=photo_url_key or course.photo_url,
            video_url=video_url_key or course.video_url,
            is_published=is_published
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
            async with S3Client() as s3_client:
                await self._delete_file(s3_client, course.video_url)
                await self._delete_file(s3_client, course.photo_url)
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
    
    async def join_the_course(
        self,
        session: AsyncSession,
        course_id: int,
        user: UserOut
    ) -> None:
        course: Course = await self.course_repository.get_course_by_id(
            session=session,
            course_id=course_id
        )
        logging.info(f"Did we get course?: {course.title}")
        user_to_add: User = await self.user_repository.get_user_by_email(
            session=session,
            email=user.email
        )
        
        user_course_owner: User = await self.user_repository.get_user_by_id(
            session=session,
            id=int(course.creator_id)
        )
        
        logging.info(f"Did we get user?: {user_to_add.username}: {user_to_add.active}")
        if user_to_add not in course.students and user_course_owner.username != user_to_add.username:
            course.students.append(user_to_add)
            logging.info(course.students)
            logging.info("student appended!")
        
        try:
            await session.commit()
        except Exception as ex:
            logging.info(f"Failed to commit: {ex}")
    
        return None

def get_course_service():
    return CourseService(CourseRepository(), UserRepository()) 