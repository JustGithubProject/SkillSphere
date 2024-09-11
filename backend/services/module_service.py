from fastapi import HTTPException, status
from authentication.schemas import UserOut
from repositories.module_repository import ModuleRepository
from database.models import Course, Module
from course.schemas import CourseOutput
from services.course_service import CourseService, get_course_service
from module.schemas import ModuleInput, ModuleOutput, ModuleUpdate
from repositories.course_repository import CourseRepository
from sqlalchemy.ext.asyncio import AsyncSession

class ModuleService:
    def __init__(
        self, 
        module_repository: ModuleRepository, 
        course_repository: CourseRepository,
        course_service: CourseService = get_course_service()
    ):
        """
        Initialize the course service with a module and course repository.
        """
        self.module_repository = module_repository
        self.course_repository = course_repository
        self.course_service = course_service

    async def get_all_modules_by_course_id(
        self,
        session: AsyncSession,
        user: UserOut,
        course_id: int,
    ) -> list[ModuleOutput]:
        course: CourseOutput = await self.course_service.get_course_by_id(
            session=session,
            course_id=course_id,
            user=user
        )
        return course.modules

    # async def get_all_modules_by_course_id(
    #     self,
    #     session: AsyncSession,
    #     user: UserOut,
    #     course_id: int,
    # ) -> list[ModuleOutput]:
    #     if await self.course_service.check_is_course_exists(
    #         session=session,
    #         course_id=course_id,
    #         user=user
    #     ):
    #         modules: list[Module] = await self.module_repository.get_all_modules_by_course_id(
    #             session=session,
    #             course_id=course_id,
    #         )
    #         return [ModuleOutput.model_validate(module, from_attributes=True) for module in modules]
    
    async def get_module_by_id(
        self,
        session: AsyncSession,
        user: UserOut,
        module_id: int,
    ) -> ModuleOutput:
        module: Module = await self.module_repository.get_module_by_id(
            session=session,
            module_id=module_id
        )
        if await self.course_service.check_is_course_exists(
            session=session,
            course_id=module.course_id,
            user=user
        ):
            return ModuleOutput.model_validate(module, from_attributes=True)

    async def create_module(
        self,
        session: AsyncSession,
        user: UserOut,
        module_input: ModuleInput
    ) -> ModuleOutput:
        if await self.course_service.check_is_course_exists(
            session=session,
            course_id=module_input.course_id,
            user=user
        ):
            module: Module = await self.module_repository.create_module(
                session=session,
                module_input=module_input
            )
            return ModuleOutput.model_validate(module, from_attributes=True)

    async def update_module(
        self,
        session: AsyncSession,
        user: UserOut,
        module_update: ModuleUpdate,
        module_id: int
    ) -> ModuleOutput:
        module: ModuleOutput = await self.module_repository.update_module(
            session=session,
            module_update=module_update,
            module_id=module_id
        )
        if await self.course_service.check_is_course_exists(
            session=session,
            course_id=module.course_id,
            user=user
        ):
            return ModuleOutput.model_validate(module, from_attributes=True)

    async def delete_module(
        self,
        session: AsyncSession,
        module_id: int,
        user: UserOut,
    ) -> None:
        module: ModuleOutput = await self.get_module_by_id(
            session=session,
            module_id=module_id,
            user=user
        )
        if module:
            return await self.module_repository.delete_module(
                session=session,
                module_id=module_id
            )


def get_module_service():
    return ModuleService(ModuleRepository(), CourseRepository(),) 