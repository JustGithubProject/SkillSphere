from typing import Annotated
from fastapi import APIRouter, Depends, status
from authentication.validation import get_current_active_auth_user
from database.database import session_getter
from sqlalchemy.ext.asyncio import AsyncSession
from authentication.schemas import UserOut
from step.schemas import StepInput, StepOutput, StepUpdate
from services.step_service import StepService, get_step_service


router = APIRouter(
    prefix="/step",
    tags=["Step Operations"]
)


@router.get("/all/{lesson_id}/", response_model=list[StepOutput])
async def get_all_steps_by_lesson_id(
    step_service: Annotated[StepService, Depends(get_step_service)],
    session: Annotated[AsyncSession, Depends(session_getter)],
    user: Annotated[UserOut, Depends(get_current_active_auth_user)],
    lesson_id: int
) -> list[StepOutput]:
    return await step_service.get_all_steps_by_lesson_id(
        session=session,
        user=user,
        lesson_id=lesson_id
    )

@router.get("/{step_id}/", response_model=StepOutput)
async def get_step_by_id(
    step_service: Annotated[StepService, Depends(get_step_service)],
    session: Annotated[AsyncSession, Depends(session_getter)],
    user: Annotated[UserOut, Depends(get_current_active_auth_user)],
    step_id: int
) -> StepOutput:
    return await step_service.get_step_by_id(
        session=session,
        step_id=step_id
    )

@router.post("/", response_model=StepOutput, status_code=status.HTTP_201_CREATED)
async def create_step_in_lesson(
    step_service: Annotated[StepService, Depends(get_step_service)],
    session: Annotated[AsyncSession, Depends(session_getter)],
    user: Annotated[UserOut, Depends(get_current_active_auth_user)],
    step_input: StepInput
) -> StepOutput:
    return await step_service.create_step(
        session=session,
        step_input=step_input
    )

@router.patch("/{step_id}/", response_model=StepOutput, status_code=status.HTTP_202_ACCEPTED)
async def update_step(
    step_service: Annotated[StepService, Depends(get_step_service)],
    session: Annotated[AsyncSession, Depends(session_getter)],
    user: Annotated[UserOut, Depends(get_current_active_auth_user)],
    step_update: StepUpdate,
    step_id: int
) -> StepOutput:
    return await step_service.update_step(
        session=session,
        step_update=step_update,
        step_id=step_id
    )

@router.delete("/{step_id}/", status_code=status.HTTP_204_NO_CONTENT)
async def delete_step(
    step_service: Annotated[StepService, Depends(get_step_service)],
    session: Annotated[AsyncSession, Depends(session_getter)],
    user: Annotated[UserOut, Depends(get_current_active_auth_user)],
    step_id: int
) -> None:
    return await step_service.delete_step(
        session=session,
        step_id=step_id
    )