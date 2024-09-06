from datetime import timedelta
from authentication.schemas import UserIn
from authentication.utils import encode_jwt
from config import (
    auth_jwt_access_token_expire_minutes,
    auth_jwt_refresh_token_expire_minutes
)


TOKEN_TYPE_FIELD = "type"
ACCESS_TOKEN_TYPE = "access"
REFRESH_TOKEN_TYPE = "refresh"


def create_jwt(
    token_type: str,
    token_data: dict,
    expire_minutes: int = auth_jwt_access_token_expire_minutes,
    expire_timedelta: timedelta | None = None,
) -> str:
    jwt_payload = {TOKEN_TYPE_FIELD: token_type}
    jwt_payload.update(token_data)
    return encode_jwt(
        payload=jwt_payload,
        expire_minutes=expire_minutes,
        expire_timedelta=expire_timedelta,
    )


def create_access_token(user: UserIn, is_admin: bool) -> str:
    jwt_payload = {
        # subject
        "sub": user.email,
        "username": user.username,
        "email": user.email,
        "admin": is_admin
        # "logged_in_at"
    }
    return create_jwt(
        token_type=ACCESS_TOKEN_TYPE,
        token_data=jwt_payload,
        expire_minutes=auth_jwt_access_token_expire_minutes,
    )


def create_refresh_token(user: UserIn) -> str:
    jwt_payload = {
        "sub": user.email,
        # "username": user.username,
    }
    return create_jwt(
        token_type=REFRESH_TOKEN_TYPE,
        token_data=jwt_payload,
        expire_timedelta=timedelta(days=auth_jwt_refresh_token_expire_minutes),
    )