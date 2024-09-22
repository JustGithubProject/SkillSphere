from enums import Currency
from pydantic import BaseModel


class PayPalOrderData(BaseModel):
    price: str
    currency_code: Currency
    

class PayPalCheckOrderData(BaseModel):
    token: str
    payer_id: str
    course_id: int