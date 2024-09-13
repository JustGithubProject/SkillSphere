from datetime import datetime
import logging

from typing import Annotated

from fastapi import (
    APIRouter, 
    Depends,
    status
)
from sqlalchemy.ext.asyncio import AsyncSession
from redis_cache import RedisCache, get_redis_helper
from database import session_getter
from services.user_service import UserService, get_user_service
from authentication.schemas import TokenInfo, UserIn, UserOut

from authentication.custom_exceptions import (
    failted_to_created_user_exception, 
    user_already_exists_exception,
    code_did_not_match_exception
)

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


@router.post("/send/code/")
async def send_code(
    user_service: Annotated[UserService, Depends(get_user_service)],
    redis_helper: Annotated[RedisCache, Depends(get_redis_helper)],
    email: str
) -> dict:
    return await user_service.send_code(
        email=email,
        redis_helper=redis_helper
    )


@router.post(
    "/signup/", 
    summary="Create new user",
    status_code=status.HTTP_201_CREATED,
)
async def create_user_handler(
    session: Annotated[AsyncSession, Depends(session_getter)],
    user_service: Annotated[UserService, Depends(get_user_service)],
    redis_helper: Annotated[RedisCache, Depends(get_redis_helper)],
    user_in: UserIn,
    code: str,
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
        code_from_redis: str = await redis_helper.get(str(user_in.email))
        if code != code_from_redis:
            raise code_did_not_match_exception
        await redis_helper.delete(user_in.email)
        # Create user using repository for user
        user_id = await user_service.register_user(
            session=session,
            user_in=user_in,
        )
        logger.info(f"User created successfully: {user_in.username}")
        return {
            "user": {
                "user_id": user_id,
                **user_in.model_dump(exclude_defaults=True)
                }
            }
    except Exception as e:
        logger.error(f"Failed to create a new user: {e}", exc_info=True)
        raise failted_to_created_user_exception
    

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
    user.last_login = datetime.now()
    # Create access and refresh token using email
    access_token = create_access_token(user, is_admin=is_admin)
    refresh_token = create_refresh_token(user)
    await user_service.update_last_login(
        session=session,
        user_id=user.id,
        new_login_time=user.last_login
    )
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

