import logging

from typing import Annotated

from fastapi import (
    APIRouter, 
    Depends,
    Query, 
    status
)
from sqlalchemy.ext.asyncio import AsyncSession
from services.course_service import CourseService, get_course_service
from database import session_getter
from services.user_service import UserService, get_user_service
from authentication.schemas import UserIn, UserOut


from authentication.validation import (
    get_current_token_payload,
    get_current_active_auth_user,
    get_current_active_auth_user_admin
)

from authentication.enums import UserAction


# Logger setup
logging.basicConfig(
    level=logging.INFO,
    format='%(filename)s:%(lineno)s - %(asctime)s - %(levelname)s - %(message)s'
)

router = APIRouter(
    prefix="/users", 
    tags=["User Operations"],
)


@router.get(
    "/me/", 
    summary="Get user info",
)
async def auth_user_check_self_info(
    payload: Annotated[dict, Depends(get_current_token_payload)],
    user: Annotated[UserOut, Depends(get_current_active_auth_user)]
):
    iat = payload.get("iat")
    return {
        **user.model_dump(exclude_defaults=True),
        "logged_in_at": iat,
    }


@router.get(
    "/all/", 
    response_model=list[UserOut],
    summary="Get all users info"
)
async def get_all_users(
    user_service: Annotated[UserService, Depends(get_user_service)],
    session: Annotated[AsyncSession, Depends(session_getter)],
    admin: Annotated[UserIn, Depends(get_current_active_auth_user_admin)],
    skip: int = Query(0, ge=0), 
    limit: int = Query(10, ge=1),
) -> list[UserOut]:
    if admin:
        return await user_service.list_users(
            session=session,
            skip=skip,
            limit=limit
        )


@router.post(
    "/ban/{email}/",
    status_code=status.HTTP_202_ACCEPTED,
    summary="Ban user by email (only for admin)",
)
async def ban_user(
    user_service: Annotated[UserService, Depends(get_user_service)],
    session: Annotated[AsyncSession, Depends(session_getter)],
    admin: Annotated[UserOut, Depends(get_current_active_auth_user_admin)],
    email: str
):
    return await user_service.update_user_ban_status_by_email(
        session=session, 
        admin=admin, 
        email=email,
        action=UserAction.BAN
    )
    
    
@router.post(
    "/unban/{email}/",
    status_code=status.HTTP_202_ACCEPTED,
    summary="Unban user by email (only for admin)",
)
async def unban_user(
    user_service: Annotated[UserService, Depends(get_user_service)],
    session: Annotated[AsyncSession, Depends(session_getter)],
    admin: Annotated[UserOut, Depends(get_current_active_auth_user_admin)],
    email: str
):
    return await user_service.update_user_ban_status_by_email(
        session=session, 
        admin=admin, 
        email=email,
        action=UserAction.UNBAN
    )


@router.post(
    "/join/course/", 
    status_code=status.HTTP_202_ACCEPTED, 
    summary="Join the course by course_id"
)
async def join_the_course(
    course_id: Annotated[int, Query()],
    user: Annotated[UserOut, Depends(get_current_active_auth_user)],
    session: Annotated[AsyncSession, Depends(session_getter)],
    course_service: Annotated[CourseService, Depends(get_course_service)],
) -> None:
    return await course_service.join_the_course(
        course_id=course_id,
        session=session,
        user=user
    )