from database.models import Step
from lesson.schemas import LessonOutput
from step.schemas import StepInput, StepOutput, StepUpdate
from services.lesson_service import get_lesson_service, LessonService
from sqlalchemy.ext.asyncio import AsyncSession
from repositories.step_repository import StepRepository


class StepService:
    def __init__(
        self, 
        step_repository: StepRepository,
        lesson_service: LessonService = get_lesson_service(), 
    ):
        """
        Initialize the step service with a lesson and step repository.
        """
        self.step_repository = step_repository
        self.lesson_service = lesson_service

    async def get_all_steps_by_lesson_id(
        self,
        session: AsyncSession,
        lesson_id: int
    ) -> list[StepOutput]:
        lesson: LessonOutput = await self.lesson_service.get_lesson_by_id(
            session=session,
            lesson_id=lesson_id
        )
        return lesson.steps
    
    async def get_step_by_id(
        self,
        session: AsyncSession,
        step_id: int
    ) -> StepOutput:
        step: Step = await self.step_repository.get_step_by_id(
            session=session,
            step_id=step_id
        )
        return StepOutput.model_validate(step, from_attributes=True)
    
    async def create_step(
        self,
        session: AsyncSession,
        step_input: StepInput
    ) -> StepOutput:
        step: Step = await self.step_repository.create_step(
            session=session,
            step_input=step_input
        )
        return StepOutput.model_validate(step, from_attributes=True)
    
    async def update_step(
        self,
        session: AsyncSession,
        step_update: StepUpdate,
        step_id: int
    ) -> StepOutput:
        step: Step = await self.step_repository.update_step(
            session=session,
            step_update=step_update,
            step_id=step_id
        )
        return StepOutput.model_validate(step, from_attributes=True)
    
    async def delete_step(
        self,
        session: AsyncSession,
        step_id: int
    ) -> None:
        return await self.step_repository.delete_step(
            session=session,
            step_id=step_id
        )

    
def get_step_service():
    return StepService(StepRepository())