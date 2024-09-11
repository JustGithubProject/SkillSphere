from datetime import datetime
from pydantic import BaseModel, ConfigDict, EmailStr


class ContactUsBase(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    full_name: str
    email: EmailStr
    message: str


class ContactUsInput(ContactUsBase):
    pass

class ContactUsOutput(ContactUsInput):
    id: int
    created_at: datetime
    is_checked: bool = False