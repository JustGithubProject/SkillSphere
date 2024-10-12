from pydantic import BaseModel, ConfigDict, EmailStr
from datetime import datetime


class UserBase(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    username: str
    email: EmailStr
    password_hash: str
    first_name: str
    last_name: str


class UserIn(UserBase):
    pass

class UserWithCode(UserBase):
    code: str
    
class ChangePasswordRequest(BaseModel):
    new_password: str
    new_password_repeat: str


class UserOut(UserBase):
    id: int
    active: bool = True
    admin: bool = False
    password_hash: bytes
    date_joined: datetime
    last_login: datetime


class TokenInfo(BaseModel):
    access_token: str
    refresh_token: str | None = None
    token_type: str = "Bearer"