from typing import Annotated
from fastapi import APIRouter, Depends, Query, status
from authentication.validation import get_current_active_auth_user
from sqlalchemy.ext.asyncio import AsyncSession
from authentication.schemas import UserOut
from services.contactus_service import ContactUsService, get_contactus_service
from contactus.schemas import ContactUsInput, ContactUsOutput
from database import session_getter


router = APIRouter(
    prefix="/contactus",
    tags=["ContactUs Operations"]
)

@router.get("/all/", response_model=list[ContactUsOutput])
async def get_all_contactus_records(
    contactus_service: Annotated[ContactUsService, Depends(get_contactus_service)],
    session: Annotated[AsyncSession, Depends(session_getter)],
    user: Annotated[UserOut, Depends(get_current_active_auth_user)],
    skip: int = Query(default=0, ge=0), 
    limit: int = Query(default=10, ge=1),
    is_checked: bool = Query(default=False)
) -> list[ContactUsOutput]:
    return await contactus_service.get_all_records(
        session=session,
        user=user,
        skip=skip,
        limit=limit,
        is_checked=is_checked,
    )

@router.post("/", response_model=ContactUsOutput, status_code=status.HTTP_201_CREATED)
async def create_contactus_record(
    contactus_service: Annotated[ContactUsService, Depends(get_contactus_service)],
    session: Annotated[AsyncSession, Depends(session_getter)],
    contactus_input: ContactUsInput
) -> ContactUsOutput:
    return await contactus_service.create_record(
        session=session,
        contactus_input=contactus_input
    )

@router.patch("/{record_id}/", response_model=ContactUsOutput, status_code=status.HTTP_202_ACCEPTED)
async def change_is_checked_row_value(
    contactus_service: Annotated[ContactUsService, Depends(get_contactus_service)],
    session: Annotated[AsyncSession, Depends(session_getter)],
    user: Annotated[UserOut, Depends(get_current_active_auth_user)],
    record_id: int,
    is_checked: bool = Query(default=True),
) -> ContactUsOutput:
    return await contactus_service.update_record(
        session=session,
        user=user,
        is_checked=is_checked,
        record_id=record_id,
    )


@router.delete("/{record_id}/", status_code=status.HTTP_204_NO_CONTENT)
async def delete_contactus_record(
    contactus_service: Annotated[ContactUsService, Depends(get_contactus_service)],
    session: Annotated[AsyncSession, Depends(session_getter)],
    user: Annotated[UserOut, Depends(get_current_active_auth_user)],
    record_id: int
) -> None:
    return await contactus_service.delete_record(
        session=session,
        record_id=record_id,
        user=user
    )