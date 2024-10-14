from repositories.lesson_repository import LessonRepository
from database.models import Lesson
from lesson.schemas import LessonInput, LessonOutput, LessonUpdate
from services.module_service import ModuleService, get_module_service
from authentication.schemas import UserOut
from sqlalchemy.ext.asyncio import AsyncSession
from module.schemas import ModuleOutput


class LessonService:
    def __init__(
        self, 
        lesson_repository: LessonRepository,
        module_service: ModuleService = get_module_service(), 
    ):
        """
        Initialize the module service with a module and course repository.
        """
        self.lesson_repository = lesson_repository
        self.module_service = module_service

    async def get_all_lessons_by_module_id(
        self,
        session: AsyncSession,
        user: UserOut,
        module_id: int,
    ) -> list[LessonOutput]:
        module: ModuleOutput = await self.module_service.get_module_by_id(
            session=session,
            user=user,
            module_id=module_id,
        )
        return module.lessons
    
    async def get_lesson_by_id(
        self,
        session: AsyncSession,
        lesson_id: int,
    ) -> LessonOutput:
        lesson: Lesson = await self.lesson_repository.get_lesson_by_id(
            session=session,
            lesson_id=lesson_id
        )
        return LessonOutput.model_validate(lesson, from_attributes=True)
    
    async def create_lesson(
        self,
        session: AsyncSession,
        lesson_input: LessonInput
    ) -> LessonOutput:
        lesson: Lesson = await self.lesson_repository.create_lesson(
            session=session,
            lesson_input=lesson_input
        )
        return LessonOutput.model_validate(lesson, from_attributes=True)
    
    async def update_lesson(
        self,
        session: AsyncSession,
        lesson_update: LessonUpdate,
        lesson_id: int
    ) -> LessonOutput:
        lesson: Lesson = await self.lesson_repository.update_lesson(
            session=session,
            lesson_update=lesson_update,
            lesson_id=lesson_id
        )
        return LessonOutput.model_validate(lesson, from_attributes=True)
    
    async def delete_lesson(
        self,
        session: AsyncSession,
        lesson_id: int,
    ) -> None:
        return await self.lesson_repository.delete_lesson(
            session=session,
            lesson_id=lesson_id,
        )
    
def get_lesson_service():
    return LessonService(LessonRepository())
