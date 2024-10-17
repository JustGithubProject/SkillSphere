from fastapi import HTTPException, status
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.orm import selectinload

from database.models import Test


class TestRepository:
    async def get_test_by_step_id(
        self,
        session: AsyncSession,
        step_id: int
    ) -> Test:
        test: Test = await session.scalar(
            select(Test)
            .where(Test.step_id==step_id)
            .options(
                selectinload(Test.answers)
            )
        )
        if test:
            return test
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Test not found"
        )
    
    async def get_test_by_test_id(
        self,
        session: AsyncSession,
        test_id: int
    ) -> Test:
        test: Test = await session.scalar(
            select(Test)
            .where(Test.id==test_id)
            .options(
                selectinload(Test.answers)
            )
        )
        if test:
            return test
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Test not found"
        )
    
    async def create_test(
        self,
        session: AsyncSession,
        step_id: int
    ) -> Test:
        try:
            test: Test = Test(step_id=step_id)
            session.add(test)
            await session.commit()
            await session.refresh(test)
            return test
        except Exception as e:
            await session.rollback()
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail=f"Can not add test. Error: {e}"
            )

    async def update_test_answers_count(
        self,
        session: AsyncSession,
        test_id: int,
        change: int 
    ) -> Test:
        try:
            test: Test = await session.get(Test, test_id)
            test.count_correct_answers += change
            await session.commit()
            await session.refresh(test, attribute_names=["answers", "count_correct_answers"])
            return test
        except Exception as e:
            await session.rollback()
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail=f"Can not update test. Error: {e}"
            )

    async def delete_test(
        self,
        session: AsyncSession,
        test_id: int
    ) -> None:
        try:
            test: Test = await session.get(Test, test_id)
            await session.delete(test)
            await session.commit()
        except Exception as e:
            await session.rollback()
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail=f"Can not delete test. Error: {e}"
            )