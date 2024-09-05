from fastapi import HTTPException, status
from sqlalchemy import select
from sqlalchemy.orm import joinedload, selectinload
from sqlalchemy.ext.asyncio import AsyncSession

from course.schemas import CourseInput
from database.models import Course


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
        **kwargs,
    ) -> list[Course]:
        stmt = (
            select(Course)
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
        course_input: CourseInput
    ) -> Course:
        try:
            course: Course = Course(**course_input.model_dump())
            session.add(course)
            await session.commit()
            return await self.get_course_by_id(
                session=session,
                course_id=course.id
            )
        except Exception as e:
            await session.rollback()
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail=f"Can not add course. Error: {e}"
            )