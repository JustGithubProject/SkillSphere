from fastapi import HTTPException, status
from sqlalchemy.orm import selectinload
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from database.models import Module


class ModuleRepository:
    async def get_all_modules_by_course_id(
        self,
        session: AsyncSession,
        course_id: int,
    ) -> Module:
        modules = await session.scalars(
            select(Module)
            .filter_by(course_id=course_id) 
            .options(
                # selectinload(Module.lessons),
            )
        )
        return modules.all()