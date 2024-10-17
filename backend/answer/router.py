from typing import Annotated
from fastapi import APIRouter, Depends, status
from authentication.validation import get_current_active_auth_user
from answer.schemas import AnswerOutput, AnswerInput, AnswerUpdate
from test.schemas import TestOutput
from database.database import session_getter
from sqlalchemy.ext.asyncio import AsyncSession
from authentication.schemas import UserOut
from services.answer_service import AnswerService, get_answer_service


router =  APIRouter(
    prefix="/answer",
    tags=["Answer Operations"]
)

@router.get("/test/{test_id}/", response_model=list[AnswerOutput])
async def get_answers_by_test_id(
    answer_service: Annotated[AnswerService, Depends(get_answer_service)],
    session: Annotated[AsyncSession, Depends(session_getter)],
    user: Annotated[UserOut, Depends(get_current_active_auth_user)],
    test_id: int
) -> list[AnswerOutput]:
    return await answer_service.get_answers_by_test_id(
        session=session,
        test_id=test_id
    )

@router.get("/{answer_id}/", response_model=AnswerOutput)
async def get_answer_by_answer_id(
    answer_service: Annotated[AnswerService, Depends(get_answer_service)],
    session: Annotated[AsyncSession, Depends(session_getter)],
    user: Annotated[UserOut, Depends(get_current_active_auth_user)],
    answer_id: int
) -> AnswerOutput:
    return await answer_service.get_answer_by_answer_id(
        session=session,
        answer_id=answer_id
    )

@router.post("/", response_model=TestOutput, status_code=status.HTTP_201_CREATED,)
async def create_answer(
    answer_service: Annotated[AnswerService, Depends(get_answer_service)],
    session: Annotated[AsyncSession, Depends(session_getter)],
    user: Annotated[UserOut, Depends(get_current_active_auth_user)],
    answer_input: AnswerInput
) -> TestOutput:
    return await answer_service.create_answer(
        session=session,
        answer_input=answer_input
    )

@router.patch("/{answer_id}/", response_model=TestOutput, status_code=status.HTTP_202_ACCEPTED)
async def update_answer(
    answer_service: Annotated[AnswerService, Depends(get_answer_service)],
    session: Annotated[AsyncSession, Depends(session_getter)],
    user: Annotated[UserOut, Depends(get_current_active_auth_user)],
    answer_update: AnswerUpdate,
    answer_id: int
) -> TestOutput:
    return await answer_service.update_answer(
        session=session,
        answer_update=answer_update,
        answer_id=answer_id
    )

@router.delete("/{answer_id}/", response_model=TestOutput, status_code=status.HTTP_202_ACCEPTED)
async def delete_answer(
    answer_service: Annotated[AnswerService, Depends(get_answer_service)],
    session: Annotated[AsyncSession, Depends(session_getter)],
    user: Annotated[UserOut, Depends(get_current_active_auth_user)],
    answer_id: int
) -> TestOutput:
    return await answer_service.delete_answer(
        session=session,
        answer_id=answer_id
    )