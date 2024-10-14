

from sqlalchemy.ext.asyncio import AsyncSession

from repositories.lesson_repository import LessonRepository 
from repositories.user_repository import UserRepository

from lesson.schemas import LessonInput, LessonOutput
from database.models import Lesson


class LessonService:
    def __init__(
        self,
        lesson_repository: LessonRepository,
        user_repository: UserRepository
    ):
        self.lesson_repository = lesson_repository
        self.user_repository = user_repository
    
    async def create_lesson(
        self,
        session: AsyncSession,
        lesson_input: LessonInput
    ):
        lesson: Lesson = await self.lesson_repository.create_lesson(
            session=session,
            lesson_input=lesson_input
        )
        lesson_schema: LessonOutput = LessonOutput.model_validate(lesson, from_attributes=True)
        return lesson_schema
    

def get_lesson_service():
    return LessonService(LessonRepository(), UserRepository()) 