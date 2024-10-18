from step.schemas import StepInput, StepUpdate
from database.models import Step, Test
from fastapi import HTTPException, status
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.orm import joinedload, selectinload


class StepRepository:
    async def get_step_by_id(
        self,
        session: AsyncSession,
        step_id: int
    ) -> Step:
        step: Step = await session.scalar(
            select(Step)
            .where(Step.id==step_id)
            .options(
                joinedload(Step.test).selectinload(Test.answers)
            )
        )
        if step:
            return step
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Step not found"
        )
    
    async def create_step(
        self,
        session: AsyncSession,
        step_input: StepInput
    ) -> Step:
        try:
            step: Step = Step(**step_input.model_dump())
            session.add(step)
            await session.commit()
            # await session.refresh(step, attributes_name=["test"])
            await session.refresh(step, options=[selectinload(Step.test), selectinload(Step.lesson)])
            return step
        except Exception as e:
            await session.rollback()
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail=f"Can not add step. Error: {e}"
            )
    
    async def update_step(
        self,
        session: AsyncSession,
        step_update: StepUpdate,
        step_id: int
    ) -> Step:
        try:
            step: Step = await session.get(Step, step_id)
            for name, value in step_update.model_dump(exclude_none=True).items():
                setattr(step, name, value)
            await session.commit()
            await session.refresh(step, attributes_name=["test"])
            return step
        except Exception as e:
            await session.rollback()
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail=f"Can not update step. Error: {e}"
            )
        
    async def delete_step(
        self,
        session: AsyncSession,
        step_id: int
    ) -> None:
        try:
            step: Step = await session.get(Step, step_id)
            await session.delete(step)
            await session.commit()
        except Exception as e:
            await session.rollback()
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail=f"Can not delete step. Error: {e}"
            )