from fastapi import HTTPException, status
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from database.models import Lesson
from lesson.schemas import LessonInput, LessonOutput, LessonUpdate


class LessonRepository:
    async def get_lesson_by_id(
        self,
        session: AsyncSession,
        lesson_id: int,
    ) -> Lesson:
        lesson: Lesson = await session.scalar(
            select(Lesson)
            .where(Lesson.id==lesson_id)
            .options(
                # selectinload(Lesson.steps)
            )
        )
        if lesson:
            return lesson
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Lesson not found"
        )
    
    async def create_lesson(
        self,
        session: AsyncSession,
        lesson_input: LessonInput
    ) -> Lesson:
        try:
            lesson: Lesson = Lesson(**lesson_input.model_dump())
            session.add(lesson)
            await session.commit()
            await session.refresh(lesson) #, attribute_names=["steps"])
            return lesson
        except Exception as e:
            await session.rollback()
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail=f"Can not add lesson. Error: {e}"
            )
        
    async def update_lesson(
        self,
        session: AsyncSession,
        lesson_update: LessonUpdate,
        lesson_id: int
    ) -> Lesson:
        try:
            lesson = await session.get(Lesson, lesson_id)
            for name, value in lesson_update.model_dump(exclude_none=True).items():
                setattr(lesson, name, value)
            await session.commit()
            await session.refresh(lesson) #, attribute_names=['steps'])
            return lesson
        except Exception as e:
            await session.rollback()
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail=f"Can not update lesson. Error: {e}"
            )
        
    async def delete_lesson(
        self,
        session: AsyncSession,
        lesson_id: int
    ) -> None:
        try:
            lesson = await session.get(Lesson, lesson_id)
            await session.delete(lesson)
            await session.commit()
        except Exception as e:
            await session.rollback()
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail=f"Can not delete lesson. Error: {e}"
            )
