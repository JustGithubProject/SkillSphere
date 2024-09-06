import logging

from typing import Annotated

from fastapi import (
    APIRouter, 
    Depends,
    status
)
from sqlalchemy.ext.asyncio import AsyncSession
from database import session_getter
from services.user_service import UserService, get_user_service
from authentication.schemas import TokenInfo, UserIn, UserOut

from authentication.custom_exceptions import UserCreateException, user_already_exists_exception

from authentication.validation import (
    validate_auth_user,
    get_current_auth_user_for_refresh,
)

from authentication.actions import (
    create_access_token, 
    create_refresh_token
)


# Logger setup
logging.basicConfig(
    level=logging.INFO,
    format='%(filename)s:%(lineno)s - %(asctime)s - %(levelname)s - %(message)s'
)

# Use a logger for this module
logger = logging.getLogger(__name__)


router = APIRouter(
    prefix="/auth", 
    tags=["Auth Operations"],
)


@router.post(
    "/signup/", 
    summary="Create new user",
    status_code=status.HTTP_201_CREATED,
)
async def create_user_handler(
    session: Annotated[AsyncSession, Depends(session_getter)],
    user_service: Annotated[UserService, Depends(get_user_service)],
    user_in: UserIn
):
    # Get user by email
    user: UserOut = await user_service.get_user_by_email(
        session=session,
        email=user_in.email
    )

    # If the user exists raise HTTPException
    if user:
        logger.warning(f"Attempted to create a user with an email that already exists: {user_in.email}")
        raise user_already_exists_exception
    try:
        # Create user using repository for user
        user_id = await user_service.register_user(
            session=session,
            user_in=user_in
        )
        logger.info(f"User created successfully: {user_in.username}")
        return {
            "user": {
                "user_id": user_id,
                **user_in.model_dump(exclude_defaults=True)
                }
            }
    except UserCreateException as ex:
        logger.error(f"Failed to create a new user: {ex}", exc_info=True)
        return f"{ex}: failure to create new user"
    

@router.post(
    "/login/", 
    summary="Create access and refresh tokens for user", 
    response_model=TokenInfo
)
async def login_handler(
    user: Annotated[UserOut, Depends(validate_auth_user)],
    session: Annotated[AsyncSession, Depends(session_getter)],
    user_service: Annotated[UserService, Depends(get_user_service)]
) -> TokenInfo:
    is_admin: bool = await user_service.check_user_is_admin(
        session=session, 
        user_in=user
    )
    # Create access and refresh token using email
    access_token = create_access_token(user, is_admin=is_admin)
    refresh_token = create_refresh_token(user)

    logger.info(f"User '{user.username}' successfully logged in.")

    # Return access and refresh token
    return TokenInfo(
        access_token=access_token,
        refresh_token=refresh_token
    )


@router.post(
    "/refresh/", 
    response_model=TokenInfo,
    response_model_exclude_none=True,
    status_code=status.HTTP_201_CREATED,
    summary="Create new access token"
)
async def auth_refresh_jwt(
    user: Annotated[UserOut, Depends(get_current_auth_user_for_refresh)],
    session: Annotated[AsyncSession, Depends(session_getter)],
    user_service: Annotated[UserService, Depends(get_user_service)]

) -> TokenInfo:
    is_admin: bool = await user_service.check_user_is_admin(
        session=session, 
        user_in=user
    )
    # можно выпускать еще refresh токен при обновлении access (некоторые так делают)
    access_token = create_access_token(user, is_admin=is_admin)
    return TokenInfo(
        access_token=access_token
    )

