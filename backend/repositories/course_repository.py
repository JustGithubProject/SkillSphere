from fastapi import HTTPException, status
from sqlalchemy import exists, select
from sqlalchemy.orm import joinedload, selectinload
from sqlalchemy.ext.asyncio import AsyncSession

from course.schemas import CourseInput, CourseUpdate
from database.models import Course, User


class CourseRepository:
    async def check_is_course_exists(
        self,
        session: AsyncSession,
        course_id: int,
    ) -> Course:
        stmt = select(exists().where(Course.id == course_id))
        course = await session.execute(stmt)
        if course:
            return course
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Course not found"
        )
        
    async def get_course_by_id(
        self,
        session: AsyncSession,
        course_id: int
    ) -> Course:
        course = await session.scalar(
            select(Course).where(Course.id == course_id) 
            .options(
                joinedload(Course.creator),
                selectinload(Course.instructors),
                selectinload(Course.modules),
                selectinload(Course.comments)
            )
        )
        if course:
            return course
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Course not found"
        )
    
    async def get_all_courses(
        self, 
        session: AsyncSession, 
        skip: int,
        limit: int,
        is_admin: bool = False,
        **kwargs,
    ) -> list[Course]:
        stmt = (
            select(Course)
            .options(
                joinedload(Course.creator),
                selectinload(Course.instructors),
                selectinload(Course.modules),
                selectinload(Course.comments)
            )
            .offset(skip)
            .limit(limit)
            .order_by(Course.id)
        )
        if not is_admin:
            stmt = stmt.filter_by(is_published=True)
        for field, value in kwargs.items():
            if value is not None:
                stmt = stmt.filter(getattr(Course, field) == value)
        
        courses: list[Course] = await session.scalars(stmt)
        return courses.all()
    
    async def fetch_all_courses_no_auth(
        self,
        session: AsyncSession,
        limit: int
    ) -> list[Course]:
        stmt = (
            select(Course)
            .options(
                joinedload(Course.creator),
                selectinload(Course.instructors),
                selectinload(Course.modules),
                selectinload(Course.comments)
            )
            .limit(limit)
            .order_by(Course.id)
        )
        result = await session.execute(stmt)
        courses: list[Course] = result.scalars().all()
        return courses
        
    
    async def create_course(
        self,
        session: AsyncSession,
        course_input: CourseInput,
        creator_id: int
    ) -> Course:
        try:
            course_dict = course_input.model_dump()
            course_dict["creator_id"] = creator_id
            course: Course = Course(**course_dict)
            session.add(course)
            await session.commit()
            await session.refresh(course, attribute_names=["creator", "instructors", "modules"])
            return course
        except Exception as e:
            await session.rollback()
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail=f"Can not add course. Error: {e}"
            )
        
    async def update_course(
        self,
        session: AsyncSession,
        course_update: CourseUpdate,
        course: Course
    ) -> Course:
        try:
            for name, value in course_update.model_dump(exclude_none=True).items():
                setattr(course, name, value)
            await session.commit()
            await session.refresh(course)
            return course
        except Exception as e:
            await session.rollback()
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail=f"Can not update course. Error: {e}"
            )
    
    async def delete_course(
        self,
        session: AsyncSession,
        course: Course
    ) -> None:
        try:
            await session.delete(course)
            await session.commit()
        except Exception as e:
            await session.rollback()
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail=f"Can not delete course. Error: {e}"
            )
        
    async def add_instructor(
        self,
        session: AsyncSession,
        instructor: User,
        course: Course,
    ) -> Course:
        try:
            course.instructors.append(instructor)
            await session.commit()
            await session.refresh(course)
            return course
        except Exception as e:
            await session.rollback()
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail=f"Can not add instructor. Error: {e}"
            )