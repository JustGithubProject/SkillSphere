from pydantic import BaseModel


class TokenSchema(BaseModel):
    access_token: str
    refresh_token: str


class TokenPayload(BaseModel):
    sub: str = None
    exp: int = None
    username: str
    
    
class Token(BaseModel):
    access_token: str
    token_type: str