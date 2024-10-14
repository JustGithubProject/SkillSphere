from fastapi import HTTPException, status
from sqlalchemy.orm import selectinload
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from module.schemas import ModuleInput, ModuleUpdate
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
                selectinload(Module.lessons),
            )
        )
        return modules.all()
    
    async def get_module_by_id(
        self,
        session: AsyncSession,
        module_id: int
    ) -> Module:
        module: Module = await session.scalar(
            select(Module)
            .where(Module.id == module_id)
            .options(
                selectinload(Module.lessons),
            )
        )
        if module:
            return module
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Module not found"
        )
    
    async def create_module(
        self,
        session: AsyncSession,
        module_input: ModuleInput
    ) -> Module:
        try:
            module: Module = Module(**module_input.model_dump())
            session.add(module)
            await session.commit()
            await session.refresh(module, attribute_names=["lessons"])
            return module
        except Exception as e:
            await session.rollback()
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail=f"Can not add module. Error: {e}"
            )

    async def update_module(
        self,
        session: AsyncSession,
        module_update: ModuleUpdate,
        module_id: int
    ) -> Module:
        async with session:
            try:
                module = await session.get(Module, module_id)
                for name, value in module_update.model_dump(exclude_none=True).items():
                    setattr(module, name, value)
                await session.commit()
                await session.refresh(module, attribute_names=['lessons'])
                return module
            except Exception as e:
                await session.rollback()
                raise HTTPException(
                    status_code=status.HTTP_400_BAD_REQUEST,
                    detail=f"Can not update module. Error: {e}"
                )
        
    async def delete_module(
        self,
        session: AsyncSession,
        module_id: int
    ) -> None:
        try:
            module = await session.get(Module, module_id)
            await session.delete(module)
            await session.commit()
        except Exception as e:
            await session.rollback()
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail=f"Can not delete module. Error: {e}"
            )