from fastapi import HTTPException, status
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from database.models import Lesson, Step, Test
from lesson.schemas import LessonInput, LessonUpdate
from sqlalchemy.orm import selectinload


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
                selectinload(Lesson.steps).joinedload(Step.test).selectinload(Test.answers)
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
            await session.refresh(lesson, attribute_names=["steps"])
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
            lesson: Lesson = await session.get(Lesson, lesson_id)
            for name, value in lesson_update.model_dump(exclude_none=True).items():
                setattr(lesson, name, value)
            await session.commit()
            await session.refresh(lesson, attribute_names=['steps'])
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
            lesson: Lesson = await session.get(Lesson, lesson_id)
            if not lesson:
                raise HTTPException(
                    status_code=status.HTTP_404_NOT_FOUND,
                    detail=f"Lesson with id {lesson_id} not found"
                )
            stmt = select(Step).where(Step.lesson_id == lesson_id)
            result = await session.execute(stmt)
            steps = result.scalars().all()
            
            for step in steps:
                await session.delete(step)
            
            await session.delete(lesson)
            await session.commit()
        except Exception as e:
            await session.rollback()
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail=f"Can not delete lesson. Error: {e}"
            )
