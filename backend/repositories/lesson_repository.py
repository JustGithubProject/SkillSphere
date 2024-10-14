from fastapi import (
    HTTPException,
    status
)

from database.models import Lesson
from sqlalchemy.ext.asyncio import AsyncSession

from lesson.schemas import LessonInput


class LessonRepository:
    async def create_lesson(
        self,
        session: AsyncSession,
        lesson_input: LessonInput,
    ) -> Lesson:
        try:
            lesson_dict = lesson_input.model_dump()
            lesson: Lesson = Lesson(**lesson_dict)
            session.add(lesson)
            await session.commit()
            await session.refresh(lesson)
            return lesson
        except Exception as ex:
            await session.rollback()
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail=f"Couldn't add lesson. Error: {ex}"
            )
        
