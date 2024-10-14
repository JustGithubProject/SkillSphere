from typing import Annotated
from fastapi import APIRouter, Depends, status

from authentication.validation import get_current_active_auth_user
from services.lesson_service import LessonService, get_lesson_service
from database.database import session_getter
from lesson.schemas import LessonInput, LessonOutput, LessonUpdate
from sqlalchemy.ext.asyncio import AsyncSession
from authentication.schemas import UserOut



router = APIRouter(
    prefix="/lesson",
    tags=["Lesson Operations"]
)

@router.get("/all/{module_id}/", response_model=list[LessonOutput])
async def get_all_lessons_by_module_id(
    lesson_service: Annotated[LessonService, Depends(get_lesson_service)],
    session: Annotated[AsyncSession, Depends(session_getter)],
    user: Annotated[UserOut, Depends(get_current_active_auth_user)],
    module_id: int
) -> list[LessonOutput]:
    return await lesson_service.get_all_lessons_by_module_id(
        session=session,
        user=user,
        module_id=module_id
    )

@router.get("/{lesson_id}/", response_model=LessonOutput)
async def get_lesson_by_id(
    lesson_service: Annotated[LessonService, Depends(get_lesson_service)],
    session: Annotated[AsyncSession, Depends(session_getter)],
    user: Annotated[UserOut, Depends(get_current_active_auth_user)],
    lesson_id: int
) -> LessonOutput:
    return await lesson_service.get_lesson_by_id(
        session=session,
        lesson_id=lesson_id
    )

@router.post("/", response_model=LessonOutput, status_code=status.HTTP_201_CREATED)
async def create_lesson_in_module(
    lesson_service: Annotated[LessonService, Depends(get_lesson_service)],
    session: Annotated[AsyncSession, Depends(session_getter)],
    user: Annotated[UserOut, Depends(get_current_active_auth_user)],
    lesson_input: LessonInput
) -> LessonOutput:
    return await lesson_service.create_lesson(
        session=session,
        lesson_input=lesson_input
    )

@router.patch("/{lesson_id}/", response_model=LessonOutput, status_code=status.HTTP_202_ACCEPTED)
async def update_lesson(
    lesson_service: Annotated[LessonService, Depends(get_lesson_service)],
    session: Annotated[AsyncSession, Depends(session_getter)],
    lesson_update: LessonUpdate,
    lesson_id: int
) -> LessonOutput:
    return await lesson_service.update_lesson(
        session=session,
        lesson_update=lesson_update,
        lesson_id=lesson_id
    )

@router.delete("/{lesson_id}/", status_code=status.HTTP_204_NO_CONTENT)
async def delete_lesson(
    lesson_service: Annotated[LessonService, Depends(get_lesson_service)],
    session: Annotated[AsyncSession, Depends(session_getter)],
    lesson_id: int
) -> None:
    return await lesson_service.delete_lesson(
        session=session,
        lesson_id=lesson_id
    )