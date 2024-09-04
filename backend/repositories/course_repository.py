from sqlalchemy import select
from sqlalchemy.orm import joinedload, selectinload
from sqlalchemy.ext.asyncio import AsyncSession

from database.models import Course


class CourseRepository:
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