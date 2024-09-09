from fastapi import HTTPException, status
from authentication.schemas import UserOut
from repositories.module_repository import ModuleRepository
from database.models import Course, Module
from course.schemas import CourseOutput
from services.course_service import CourseService, get_course_service
from module.schemas import ModuleOutput
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
    ) -> ModuleOutput:
        course: Course = await self.course_service.get_course_by_id(
            session=session,
            course_id=course_id,
            user=user
        )
        if not course:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Course not found"
            )
        modules: list[Module] = await self.module_repository.get_all_modules_by_course_id(
            session=session,
            course_id=course_id,
        )
        return [ModuleOutput.model_validate(module, from_attributes=True) for module in modules]


def get_module_service():
    return ModuleService(ModuleRepository(), CourseRepository(),) 