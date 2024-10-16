from database.models import Test
from test.schemas import TestOutput
from repositories.test_repository import TestRepository
from sqlalchemy.ext.asyncio import AsyncSession


class TestService:
    def __init__(
        self, 
        test_repository: TestRepository,
    ):
        """
        Initialize the test service with a test and step repository.
        """
        self.test_repository = test_repository

    async def get_test_by_step_id(
        self,
        session: AsyncSession,
        step_id: int
    ) -> TestOutput:
        test: Test = await self.test_repository.get_test_by_step_id(
            session=session,
            step_id=step_id
        )
        return TestOutput.model_validate(test, from_attributes=True)
    
    async def get_test_by_test_id(
        self,
        session: AsyncSession,
        test_id: int,
    ) -> TestOutput:
        test: Test = await self.test_repository.get_test_by_test_id(
            session=session,
            test_id=test_id
        )
        return TestOutput.model_validate(test, from_attributes=True)

    async def create_test(
        self,
        session: AsyncSession,
        step_id: int
    ) -> TestOutput:
        test: Test = await self.test_repository.create_test(
            session=session,
            step_id=step_id
        )
        return TestOutput.model_validate(test, from_attributes=True)
    
    async def delete_test(
        self,
        session: AsyncSession,
        test_id: int
    ) -> None:
        return await self.test_repository.delete_test(
            session=session,
            test_id=test_id
        )
    
def get_test_service():
    return TestService(TestRepository())