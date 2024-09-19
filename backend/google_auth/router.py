from typing import Annotated

from sqlalchemy.ext.asyncio import AsyncSession
from fastapi import (
    APIRouter,
    HTTPException,
    Depends,
    status
)

from google.oauth2 import id_token
from google.auth.transport import requests

from services.user_service import UserService, get_user_service
from database import session_getter
from authentication.schemas import (
    TokenInfo,
    UserIn,
    UserOut
)

from authentication.actions import (
    create_access_token, 
    create_refresh_token
)

from config import GOOGLE_CLIENT_ID


router = APIRouter(
    tags=["Google Operations"],
)


@router.get('/auth/google/callback')
async def google_callback(
    session: Annotated[AsyncSession, Depends(session_getter)],
    user_service: Annotated[UserService, Depends(get_user_service)],
    google_id_token: str
):
    id_info = id_token.verify_oauth2_token(google_id_token, requests.Request(), GOOGLE_CLIENT_ID)
    
    print("ID_INFO: ", id_info) 
    
    # Getting google data
    email = id_info.get("email")
    name = id_info.get("name")
    first_name = id_info.get("given_name")
    last_name = id_info.get("family_name")
    
    # Get user by email
    user: UserOut = await user_service.get_user_by_email(
        session=session,
        email=email
    )
    
    # if user doesn't exist -> (create new)
    if not user:
        await user_service.google_register_user(
            session=session,
            username=name,
            first_name=first_name,
            last_name=last_name,
            email=email
        )
        
        # Get new user by username
        user: UserOut = await user_service.get_user_by_username(
            session=session,
            username=name
        )
        
    
    access_token = create_access_token(
        user,
        False
    )

    return {'access_token': access_token, 'token_type': 'bearer'}


