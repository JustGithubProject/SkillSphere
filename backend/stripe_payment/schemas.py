from pydantic import BaseModel, ConfigDict


class PaymentOutput(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    user_id: int
    email: str
    course_id: int
    order_id: str
    intent: str