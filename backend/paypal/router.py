from typing import Annotated


import httpx

from sqlalchemy.ext.asyncio import AsyncSession
from fastapi import (
    APIRouter,
    HTTPException,
    Depends,
    status
)


from authentication.validation import get_current_active_auth_user
from authentication.schemas import UserOut

from services.user_service import UserService, get_user_service


from paypal.utils import (
    get_paypal_headers,
    get_paypal_json
)
from config import PAYPAL_BASE_URL
from database import session_getter
from paypal.schemas import PayPalOrderData


router = APIRouter(
    prefix="/paypal",
    tags=["PayPal Operations"],
)


@router.post("/create-order")
async def paypal_create_order(
    session: Annotated[AsyncSession, Depends(session_getter)],
    user: Annotated[UserOut, Depends(get_current_active_auth_user)],
    paypal_data: PayPalOrderData
    
):
    headers = get_paypal_headers(paypal_data.access_token)
    
    async with httpx.AsyncClient() as client:
        response = await client.post(
            PAYPAL_BASE_URL + "/v2/checkout/orders",
            headers=headers,
            json=get_paypal_json(
                paypal_data.price,
                paypal_data.currency_code
            )
        )
    
    return response
    
    
    
    
    
    

