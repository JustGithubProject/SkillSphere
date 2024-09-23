from typing import Annotated
import logging


# import httpx
import requests

from sqlalchemy.ext.asyncio import AsyncSession
from fastapi import (
    APIRouter,
    HTTPException,
    Depends,
    status
)



from authentication.validation import get_current_auth_user
from authentication.schemas import UserOut

from services.user_service import (
    UserService,
    get_user_service
)

from services.course_service import (
    CourseService,
    get_course_service
)


from paypal.utils import (
    get_paypal_headers,
    get_paypal_json,
    get_paypal_access_token
)

from config import PAYPAL_BASE_URL

from database import session_getter

from paypal.schemas import (
    PayPalOrderData,
    PayPalCheckOrderData
)


router = APIRouter(
    prefix="/paypal",
    tags=["PayPal Operations"],
)


@router.post("/create-order")
async def paypal_create_order(
    user: Annotated[UserOut, Depends(get_current_auth_user)],
    paypal_data: PayPalOrderData
):
    if user:
        # Getting paypal access_token
        response = get_paypal_access_token()
        logging.info(f"Response Auth: {response}")
        paypal_access_token = response.json().get("access_token")
        headers = get_paypal_headers(paypal_access_token)
        
        
        # Request to create paypal order
        response = requests.post(
            PAYPAL_BASE_URL + "/v2/checkout/orders",
            headers=headers,
            data=get_paypal_json(
                price=paypal_data.price,
                currency_code=paypal_data.currency_code
            )
        )
            
        # TODO: additional logic to send 90% of the money to the owner of course, and 10% to the site owner.
        logging.info(f"Result: {response.json()}")
        return response.json()
    else:
        return "Unauthorized user"


    
@router.post("/check/payment")
async def paypal_check_payment(
    session: Annotated[AsyncSession, Depends(session_getter)],
    user: Annotated[UserOut, Depends(get_current_auth_user)],
    course_service: Annotated[CourseService, Depends(get_course_service)],
    paypal_check_data: PayPalCheckOrderData,
):
    if user:
        # Getting paypal access_token
        response = get_paypal_access_token()
        paypal_access_token = response.json().get("access_token")
        
        
        # Request for information about a created order
        headers = {
            'Authorization': f'Bearer {paypal_access_token}',
        }
        
        response = requests.get(
            PAYPAL_BASE_URL + "/v2/checkout/orders/" + paypal_check_data.token,
            headers=headers
        )
        
        status = response.json().get("status")
        
        # Checking status of paypal order
        if status == "APPROVED":
            logging.info(f"Status: {status}")
            
            # Adding student to course
            await course_service.join_the_course(
                session=session,
                course_id=paypal_check_data.course_id,
                user=user
            )
            logging.info("The student has been added successfully")
        else:
            logging.info(f"Status: {status}")
            return "Failed to buy course"
    else:
        return "Unauthorized user"
            
        


    
    
    

