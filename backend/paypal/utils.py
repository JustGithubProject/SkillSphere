import json
import uuid

from enums import Currency


def generate_paypal_unique_id() -> str:
    return str(uuid.uuid4())


def get_paypal_headers(access_token: str) -> dict:
    return {
        'Content-Type': 'application/json',
        'PayPal-Request-Id': f'{generate_paypal_unique_id()}',
        'Authorization': f'Bearer {access_token}',
    }
    



def get_paypal_json(
    price: str,
    currency_code: Currency
) -> str:
    data = {
        "intent": "CAPTURE",
        "purchase_units": [
            {
                "reference_id": f"{generate_paypal_unique_id()}",
                "amount": {
                    "currency_code": currency_code,
                    "value": price
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
                    "return_url": "https://example.com/returnUrl",
                    "cancel_url": "https://example.com/cancelUrl"
                }
            }
        }
    }
    
    return json.dumps(data, indent=4)
    
