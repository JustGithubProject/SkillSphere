from sqlalchemy import select
from answer.schemas import AnswerInput, AnswerUpdate
from database.models import Answer, Test
from fastapi import HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.orm import selectinload


class AnswerRepository:
    async def get_answer_by_answer_id(
        self,
        session: AsyncSession,
        answer_id: int
    ) -> Answer:  
        answer: Answer = await session.get(Answer, answer_id)
        if answer:
            return answer
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Answer not found"
        )
    
    async def create_answer(
        self,
        session: AsyncSession,
        answer_input: AnswerInput
    ) -> Answer:
        try:
            answer: Answer = Answer(**answer_input.model_dump())
            session.add(answer)
            await session.commit()
            await session.refresh(answer, attribute_names=["test"])
            return answer
        except Exception as e:
            await session.rollback()
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail=f"Can not add answer. Error: {e}"
            )
        
    async def update_answer(
        self,
        session: AsyncSession,
        answer_update: AnswerUpdate,
        answer_id: int
    ) -> Answer:
        try:
            answer: Answer = await session.get(Answer, answer_id)
            for name, value in answer_update.model_dump(exclude_none=True).items():
                setattr(answer, name, value)
            await session.commit()
            await session.refresh(answer)
            return answer
        except Exception as e:
            await session.rollback()
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail=f"Can not update answer. Error: {e}"
            )
        
    async def delete_answer(
        self,
        session: AsyncSession,
        answer: Answer
    ) -> None:
        try:
            await session.delete(answer)
            await session.commit()
        except Exception as e:
            await session.rollback()
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail=f"Can not delete answer. Error: {e}"
            )