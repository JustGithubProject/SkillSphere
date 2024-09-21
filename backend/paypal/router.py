from typing import Annotated
import logging


# import httpx
import requests

from requests.auth import HTTPBasicAuth

from sqlalchemy.ext.asyncio import AsyncSession
from fastapi import (
    APIRouter,
    HTTPException,
    Depends,
    status
)


from authentication.validation import get_current_auth_user
from authentication.schemas import UserOut

from services.user_service import UserService, get_user_service


from paypal.utils import (
    get_paypal_headers,
    get_paypal_json
)

from config import (
    PAYPAL_BASE_URL,
    PAYPAL_CLIENT_ID,
    PAYPAL_SECRET_KEY
)

from database import session_getter
from paypal.schemas import PayPalOrderData


router = APIRouter(
    prefix="/paypal",
    tags=["PayPal Operations"],
)


@router.post("/create-order")
async def paypal_create_order(
    session: Annotated[AsyncSession, Depends(session_getter)],
    user: Annotated[UserOut, Depends(get_current_auth_user)],
    paypal_data: PayPalOrderData
):
    # Getting paypal access_token
    response = requests.post(
        PAYPAL_BASE_URL + "/v1/oauth2/token",
        headers={
            "Content-Type": "application/x-www-form-urlencoded"
        },
        data={
            "grant_type": "client_credentials"
        },
        auth=HTTPBasicAuth(PAYPAL_CLIENT_ID, PAYPAL_SECRET_KEY)
    )
    logging.info(f"Response Auth: {response}")
    
    headers = get_paypal_headers(response.json().get("access_token"))
    
    logging.info(f"PAYPAL_BASE_URL: {PAYPAL_BASE_URL}")
    
    
    # Request to create paypal order
    response = requests.post(
        PAYPAL_BASE_URL + "/v2/checkout/orders",
        headers=headers,
        data=get_paypal_json(
            price=paypal_data.price,
            currency_code=paypal_data.currency_code
        )
    )
    
    # async with httpx.AsyncClient() as client:
    #     try:
    #         response = await client.post(
    #             PAYPAL_BASE_URL + "/v2/checkout/orders",
    #             headers=headers,
    #             json=get_paypal_json(
    #                 paypal_data.price,
    #                 str(paypal_data.currency_code.value)
    #             )
    #         )
    #         response.raise_for_status()
            
    #         order_id = response.json().get("id")
    #         if order_id is None:
    #             logging.error("Order ID not found in response")
    #             raise HTTPException(status_code=400, detail="Order ID not found in response")
            
    #     except httpx.HTTPStatusError as ex:
    #         raise HTTPException(status_code=ex.response.status_code, detail=ex.response.json())
        
    #     except Exception as ex:
    #         raise HTTPException(status_code=500, detail=str(ex))
        
    # TODO: additional logic to send 90% of the money to the owner of course, and 10% to the site owner.
    logging.info(f"Success: {response.json()}")
    return response.json()

    
    
    
    
    

