from enums import Currency
import json
import uuid

import requests
from requests.auth import HTTPBasicAuth

from config import (
    PAYPAL_BASE_URL,
    PAYPAL_CLIENT_ID,
    PAYPAL_SECRET_KEY
)


def generate_paypal_unique_id() -> str:
    return str(uuid.uuid4())


def get_paypal_headers(access_token: str) -> dict:
    return {
        'Content-Type': 'application/json',
        'PayPal-Request-Id': f'{generate_paypal_unique_id()}',
        'Authorization': f'Bearer {access_token}',
    }

def get_paypal_headers_to_send_money(access_token: str) -> dict:
    return  {
        'Content-Type': 'application/json',
        'Authorization': f'Bearer {access_token}'
    }


def get_paypal_json(
    price: str,
    currency_code: str,
) -> str:
    shipping_address = {
        "name": {
            "full_name": "John Doe"
        },
        "address_line_1": "123 Main St",
        "address_line_2": "Apt 4B",
        "admin_area_2": "Los Angeles",
        "admin_area_1": "CA",
        "postal_code": "90001",
        "country_code": "US"  
    }

    data = {
        "intent": "CAPTURE",
        "purchase_units": [
            {
                "reference_id": f"{generate_paypal_unique_id()}",
                "amount": {
                    "currency_code": currency_code,
                    "value": price
                },
                "shipping": {
                    "address": shipping_address
                }
            }
        ],
        "payment_source": {
            "paypal": {
                "experience_context": {
                    "payment_method_preference": "IMMEDIATE_PAYMENT_REQUIRED",
                    "brand_name": "EXAMPLE INC",
                    "locale": "en-US",
                    "landing_page": "LOGIN",
                    "shipping_preference": "SET_PROVIDED_ADDRESS",
                    "user_action": "PAY_NOW",
                    "return_url": "http://localhost:3000/",
                    "cancel_url": "https://example.com/cancelUrl"
                }
            }
        }
    }
    
    return json.dumps(data, indent=4)

def get_paypal_json_to_send_money(
    price: str,
    owner_paypal_email: str
) -> str:
    """
        NOTE: It could be incorrect JSON to check it go to:
            https://developer.paypal.com/docs/api/payments.payouts-batch/v1/#payouts_post
    """
    
    data = {
        "sender_batch_header": {
            "sender_batch_id": "batch-123456",
            "email_subject": "You have a payment"
        },
        "items": [
            {
                "recipient_type": "EMAIL",
                "receiver": owner_paypal_email,
                "amount": {
                    "value": price,
                    "currency": "USD"
                },
                "note": "Thanks for your business",
                "sender_item_id": "item-1"
            }
        ]
    }
    return json.dumps(data, indent=4)
    


def get_paypal_access_token():
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
    return response