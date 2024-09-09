from typing import Annotated
from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession
from authentication.schemas import UserOut
from authentication.validation import get_current_active_auth_user
from services.module_service import ModuleService, get_module_service
from database.database import session_getter
from module.schemas import ModuleOutput


router = APIRouter(
    prefix="/module",
    tags=["Module Operations"]
)


@router.get("/all/{course_id}/", response_model=list[ModuleOutput])
async def get_all_modules_by_course_id(
    module_service: Annotated[ModuleService, Depends(get_module_service)],
    session: Annotated[AsyncSession, Depends(session_getter)],
    user: Annotated[UserOut, Depends(get_current_active_auth_user)],
    course_id: int,
) -> list[ModuleOutput]:
    return await module_service.get_all_modules_by_course_id(
        session=session,
        user=user,
        course_id=course_id
    )