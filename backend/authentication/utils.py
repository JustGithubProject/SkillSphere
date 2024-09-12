import random
import string

from datetime import datetime, timedelta


import uuid
import bcrypt
import jwt
from config import (
    auth_jwt_private_key, 
    auth_jwt_algorithm, 
    auth_jwt_access_token_expire_minutes,
    auth_jwt_public_key
)


# создание(шифрование) токена
def encode_jwt(
    payload: dict,
    private_key: str = auth_jwt_private_key,
    algorithm: str = auth_jwt_algorithm,
    expire_minutes: int = auth_jwt_access_token_expire_minutes,
    expire_timedelta: timedelta | None = None,
) -> str:
    to_encode = payload.copy()
    now = datetime.now()
    if expire_timedelta:
        expire = now + expire_timedelta
    else:
        expire = now + timedelta(minutes=expire_minutes)
    to_encode.update(
        exp=expire,
        iat=now,
        # уникальный айди для токена (потом можно будет сделать систему банов по этим токенам)
        jti=str(uuid.uuid4())
    )
    encoded = jwt.encode(
        to_encode,
        private_key,
        algorithm=algorithm,
    )
    return encoded


# расшифрование токена
def decode_jwt(
    token: str | bytes,
    public_key: str = auth_jwt_public_key,
    algorithm: str = auth_jwt_algorithm,
) -> dict:
    decoded = jwt.decode(
        token,
        public_key,
        algorithms=[algorithm],
    )
    return decoded


def hash_password(
    password: str,
) -> bytes:
    salt = bcrypt.gensalt()
    pwd_bytes: bytes = password.encode()
    return bcrypt.hashpw(password=pwd_bytes, salt=salt)


def validate_password(
    password: str,
    hashed_password: bytes
) -> bool:
    return bcrypt.checkpw(
        password=password.encode(),
        hashed_password=hashed_password
    )



def generate_random_password():
    """
        Helper function to generate
        random password for google
    """
    letters = string.ascii_letters
    digits = string.digits
    
    symbols = letters + digits
    
    
    generated_password = ''
    
    for i in range(8):
        generated_password += random.choice(symbols)
    
    return generated_password
        
    