from typing import Annotated
from fastapi import APIRouter, Depends, status
from authentication.validation import get_current_active_auth_user
from services.test_service import TestService, get_test_service
from test.schemas import TestOutput
from database.database import session_getter
from sqlalchemy.ext.asyncio import AsyncSession
from authentication.schemas import UserOut


router = APIRouter(
    prefix="/test",
    tags=["Test Operations"]
)

@router.get("/step/{step_id}/", response_model=TestOutput)
async def get_test_by_step_id(
    test_service: Annotated[TestService, Depends(get_test_service)],
    session: Annotated[AsyncSession, Depends(session_getter)],
    user: Annotated[UserOut, Depends(get_current_active_auth_user)],
    step_id: int
) -> TestOutput:
    return await test_service.get_test_by_step_id(
        session=session,
        step_id=step_id
    )

@router.get("/{test_id}/", response_model=TestOutput)
async def get_test_by_test_id(
    test_service: Annotated[TestService, Depends(get_test_service)],
    session: Annotated[AsyncSession, Depends(session_getter)],
    user: Annotated[UserOut, Depends(get_current_active_auth_user)],
    test_id: int
) -> TestOutput:
    return await test_service.get_test_by_test_id(
        session=session,
        test_id=test_id
    )

@router.post(
    "/", 
    response_model=TestOutput, 
    status_code=status.HTTP_201_CREATED, 
    response_model_exclude_defaults=True
)
async def create_test_in_step(
    test_service: Annotated[TestService, Depends(get_test_service)],
    session: Annotated[AsyncSession, Depends(session_getter)],
    user: Annotated[UserOut, Depends(get_current_active_auth_user)],
    step_id: int
) -> TestOutput:
    return await test_service.create_test(
        session=session,
        step_id=step_id
    )

@router.delete("/{test_id}/", status_code=status.HTTP_204_NO_CONTENT)
async def delete_test(
    test_service: Annotated[TestService, Depends(get_test_service)],
    session: Annotated[AsyncSession, Depends(session_getter)],
    user: Annotated[UserOut, Depends(get_current_active_auth_user)],
    test_id: int
) -> None:
    return await test_service.delete_test(
        session=session,
        test_id=test_id
    )