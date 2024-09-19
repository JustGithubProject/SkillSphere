from pydantic import BaseModel

from enums import Currency


class PayPalOrderData(BaseModel):
    price: str
    currency_code: Currency
    access_token: str