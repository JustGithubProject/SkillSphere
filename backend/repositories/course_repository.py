from fastapi import HTTPException, status
from sqlalchemy import select
from sqlalchemy.orm import joinedload, selectinload
from sqlalchemy.ext.asyncio import AsyncSession

from course.schemas import CourseInput, CourseUpdate
from database.models import Course, User


class CourseRepository:
    async def get_course_by_id(
        self,
        session: AsyncSession,
        course_id: int
    ) -> Course:
        course = await session.scalar(
            select(Course).where(Course.id == course_id) 
            .options(
                joinedload(Course.creator),
                selectinload(Course.instructors)
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
            .filter_by(is_published=is_admin)
            .options(
                joinedload(Course.creator),
                selectinload(Course.instructors)
            )
            .offset(skip)
            .limit(limit)
            .order_by(Course.id)
        )
        for field, value in kwargs.items():
            if value is not None:
                stmt = stmt.filter(getattr(Course, field) == value)
        
        courses: list[Course] = await session.scalars(stmt)
        return courses.all()
    
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
            await session.refresh(course, attribute_names=["creator", "instructors"])
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
            # Обновите и верните объект курса
            await session.refresh(course)
            return course  # Вернуть обновленный курс
        except Exception as e:
            await session.rollback()
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail=f"Can not add instructor. Error: {e}"
            )