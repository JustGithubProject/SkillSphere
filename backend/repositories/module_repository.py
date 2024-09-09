from fastapi import HTTPException, status
from sqlalchemy.orm import selectinload
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from module.schemas import ModuleInput
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
    
    async def create_module(
        self,
        session: AsyncSession,
        module_input: ModuleInput
    ) -> Module:
        try:
            module: Module = Module(**module_input.model_dump())
            session.add(module)
            await session.commit()
            return module
        except Exception as e:
            await session.rollback()
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail=f"Can not add module. Error: {e}"
            )
