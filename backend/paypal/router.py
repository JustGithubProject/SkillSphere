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
    get_paypal_access_token,
    get_paypal_headers_to_send_money,
    get_paypal_json_to_send_money
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
        # Get PayPal access token
        response = get_paypal_access_token()
        if response.status_code != 200:
            logging.error(f"Failed to get PayPal access token: {response.status_code} {response.text}")
            return {"error": "Failed to get PayPal access token", "details": response.text}

        paypal_access_token = response.json().get("access_token")
        if not paypal_access_token:
            logging.error("PayPal access token is missing in the response.")
            return {"error": "Missing PayPal access token"}

        # Request order details
        headers = {
            'Authorization': f'Bearer {paypal_access_token}',
        }
        
        response = requests.get(
            f"{PAYPAL_BASE_URL}/v2/checkout/orders/{paypal_check_data.token}",
            headers=headers
        )
        
        if response.status_code != 200:
            logging.error(f"Error getting PayPal order details: {response.status_code} {response.text}")
            return {"error": "Failed to get PayPal order details", "details": response.text}
        
        order_data = response.json()
        status = order_data.get("status")
        price = order_data.get("purchase_units")[0].get("amount").get("value")
        logging.info(f"Price: {price}")
        logging.info(f"Status: {status}")
        logging.info(f"User: {user}")
        logging.info(f"course_id: {paypal_check_data.course_id}")
        
        # Check the status of the PayPal order
        if status == "APPROVED":
            # Calculate 90% of the price
            
            price_90_percent = float(price) * 0.9
            price_90_percent_string = f"{float(price_90_percent):.2f}"
            logging.info(f"Price: {price_90_percent_string}")
            
            current_course = await course_service.get_course_by_id_no_auth(
                session=session,
                course_id=paypal_check_data.course_id,
            )
            
            # Extract the course owner's PayPal email
            owner_paypal_email = current_course.owner_paypal_email
            if not owner_paypal_email:
                logging.info("Course owner does not provide PayPal email.")
                return {"error": "Course owner does not provide PayPal email."}
            logging.info(f"OWNER_PAYPAL_EMAIL: {owner_paypal_email}")
            # Send the money to the course owner
            headers_to_send_money = get_paypal_headers_to_send_money(paypal_access_token)
            json_data = get_paypal_json_to_send_money(price_90_percent_string, owner_paypal_email)
            
            response = requests.post(
                f"{PAYPAL_BASE_URL}/v1/payments/payouts",
                headers=headers_to_send_money,
                data=json_data
            )
            
            if response.status_code != 201:
                logging.info(f"Error sending payout to PayPal: {response.status_code} {response.text}")
                return {"error": "Failed to send payout to owner", "details": response.text}
            
            # Add student to the course
            try:
                await course_service.join_the_course(
                    session=session,
                    course_id=paypal_check_data.course_id,
                    user=user
                )
                logging.info("The student has been added successfully")
            except Exception as ex:
                logging.error(f"Failed to add student to course: {ex}")
                return {"error": "Failed to add student to course", "details": str(ex)}

            return {"message": "Payment successful, student added to course."}
        
        else:
            logging.info(f"Order status is not approved: {status}")
            return {"error": "Failed to buy course, order not approved."}
    
    else:
        logging.error("Unauthorized user.")
        return {"error": "Unauthorized user"}
            
        


    
    
    

