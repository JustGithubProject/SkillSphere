from fastapi import HTTPException, status
from answer.schemas import AnswerInput, AnswerOutput, AnswerUpdate
from repositories.test_repository import TestRepository
from database.models import Answer, Test
from test.schemas import TestOutput
from services.test_service import TestService, get_test_service
from sqlalchemy.ext.asyncio import AsyncSession
from repositories.answer_repository import AnswerRepository


class AnswerService:
    def __init__(
        self, 
        answer_repository: AnswerRepository,
        test_repository: TestRepository,
        test_service: TestService = get_test_service(),
    ):
        """
        Initialize the test service with a test and step repository.
        """
        self.test_service = test_service
        self.test_repository = test_repository
        self.answer_repository = answer_repository

    async def get_answers_by_test_id(
        self,
        session: AsyncSession,
        test_id: int
    ) -> TestOutput:
        test: TestOutput = await self.test_service.get_test_by_test_id(
            session=session,
            test_id=test_id
        )
        if test:
            return test.answers
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Test not found"
        )
    
    async def get_answer_by_answer_id(
        self,
        session: AsyncSession,
        answer_id: int
    ) -> AnswerOutput:
        answer: Answer = await self.answer_repository.get_answer_by_answer_id(
            session=session,
            answer_id=answer_id
        )
        return AnswerOutput.model_validate(answer, from_attributes=True)
    
    async def create_answer(
        self,
        session: AsyncSession,
        answer_input: AnswerInput    
    ) -> TestOutput:
        answer: Answer = await self.answer_repository.create_answer(
            session=session,
            answer_input=answer_input
        )
        if not answer:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Answer did not add"
            )
        change: int = 1 if answer.is_correct else 0
        if change:
            test: Test = await self.test_repository.update_test_answers_count(
                session=session,
                test_id=answer.test_id,
                change=change
            )
        else:
            test: Test = await self.test_repository.get_test_by_test_id(
                session=session,
                test_id=answer.test_id,
            )
        return TestOutput.model_validate(test, from_attributes=True)
    
    async def update_answer(
        self,
        session: AsyncSession,
        answer_update: AnswerUpdate,
        answer_id: int
    ) -> TestOutput:
        answer: Answer = await self.answer_repository.get_answer_by_answer_id(
            session=session,
            answer_id=answer_id
        )
        is_correct_field_before_update: bool = answer.is_correct
        change: int = 0

        if answer_update.is_correct != None:
            if is_correct_field_before_update != answer_update.is_correct:
                change: int = 1 if answer_update.is_correct else -1

        answer: Answer = await self.answer_repository.update_answer(
            session=session,
            answer_update=answer_update,
            answer_id=answer_id
        )
        if not answer:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Answer did not update"
            )
        if change:
            test: Test = await self.test_repository.update_test_answers_count(
                session=session,
                test_id=answer.test_id,
                change=change
            )
        else:
            test: Test = await self.test_repository.get_test_by_test_id(
                session=session,
                test_id=answer.test_id,
            )
        return TestOutput.model_validate(test, from_attributes=True)

    async def delete_answer(
        self,
        session: AsyncSession,
        answer_id: int
    ) -> TestOutput:
        answer: Answer = await self.answer_repository.get_answer_by_answer_id(
            session=session,
            answer_id=answer_id
        )
        await self.answer_repository.delete_answer(
            session=session,
            answer=answer
        )
        change: int = -1 if answer.is_correct else 0
        if change:
            test: Test = await self.test_repository.update_test_answers_count(
                session=session,
                test_id=answer.test_id,
                change=change
            )
        else:
            test: Test = await self.test_repository.get_test_by_test_id(
                session=session,
                test_id=answer.test_id,
            )
        return TestOutput.model_validate(test, from_attributes=True)
    

def get_answer_service():
    return AnswerService(AnswerRepository(), TestRepository())