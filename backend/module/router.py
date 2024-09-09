from typing import Annotated
from fastapi import APIRouter, Depends, status
from sqlalchemy.ext.asyncio import AsyncSession
from authentication.schemas import UserOut
from authentication.validation import get_current_active_auth_user
from services.module_service import ModuleService, get_module_service
from database.database import session_getter
from module.schemas import ModuleOutput, ModuleInput


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

@router.post("/", response_model=ModuleOutput, status_code=status.HTTP_201_CREATED)
async def create_module_in_course(
    module_service: Annotated[ModuleService, Depends(get_module_service)],
    session: Annotated[AsyncSession, Depends(session_getter)],
    user: Annotated[UserOut, Depends(get_current_active_auth_user)],
    module_input: ModuleInput
) -> ModuleOutput:
    return await module_service.create_module(
        session=session,
        user=user,
        module_input=module_input
    )