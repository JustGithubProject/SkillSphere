from typing import Annotated


from httpx import AsyncClient
from sqlalchemy.ext.asyncio import AsyncSession
from fastapi import (
    APIRouter,
    HTTPException,
    Depends,
    status
)

from services.user_service import UserService, get_user_service
from database import session_getter
from authentication.schemas import (
    TokenInfo,
    UserIn,
    UserOut
)
from config import (
    GOOGLE_CLIENT_ID,
    GOOGLE_CLIENT_SECRET
)


router = APIRouter(
    tags=["Google Operations"],
)


@router.get('/auth/google/callback')
async def google_callback(
    session: Annotated[AsyncSession, Depends(session_getter)],
    user_service: Annotated[UserService, Depends(get_user_service)],
    code: str
):
    async with AsyncClient() as client:
        token_resp = await client.post('https://oauth2.googleapis.com/token', data={
            'client_id': GOOGLE_CLIENT_ID,
            'client_secret': GOOGLE_CLIENT_SECRET,
            'code': code,
            'grant_type': 'authorization_code',
            'redirect_uri': 'http://localhost:8000/auth/google/callback',
        })
        token_resp.raise_for_status()
        token_data = token_resp.json()
        access_token = token_data['access_token']
        user_resp = await client.get('https://www.googleapis.com/oauth2/v2/userinfo', headers={
            'Authorization': f'Bearer {access_token}'
        })
        user_resp.raise_for_status()
        user_data = user_resp.json()
    
    # Get user by email
    user: UserOut = await user_service.get_user_by_email(
        session=session,
        email=user_data['email']
    )
    
    # if user doesn't exist -> (create new)
    if not user:
        await user_service.google_register_user(
            session=session,
            username=user_data["name"],
            first_name=user_data["given_name"],
            last_name=user_data["family_name"],
            email=user_data["email"]
        )

    return {'access_token': access_token, 'token_type': 'bearer'}


