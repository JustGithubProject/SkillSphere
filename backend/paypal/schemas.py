from enums import Currency
from pydantic import BaseModel


class PayPalOrderData(BaseModel):
    price: str
    currency_code: Currency