import os
from datetime import datetime, timedelta
from typing import Union, Any

from dotenv import load_dotenv
from jose import jwt

from config import (
    JWT_REFRESH_SECRET_KEY,
    JWT_SECRET_KEY,
    ACCESS_TOKEN_EXPIRE_MINUTES,
    REFRESH_TOKEN_EXPIRE_MINUTES,
    ALGORITHM
)


def create_access_token(username: str, subject: Union[str, Any], expires_delta: int = None) -> str:
    """ 
        This function generates a JWT access token
        with a specified expiration time
    """
    if expires_delta is not None:
        expires_delta = datetime.utcnow() + expires_delta
    else:
        expires_delta = datetime.utcnow() + timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    
    to_encode = {"exp": expires_delta, "sub": str(subject), "username": username}
    encoded_jwt = jwt.encode(to_encode, JWT_SECRET_KEY, ALGORITHM)
    return encoded_jwt


def create_refresh_token(username: str, subject: Union[str, Any], expires_delta: int = None) -> str:
    """
        This function generates a JWT refresh token
        with a specified expiration time
    """
    if expires_delta is not None:
        expires_delta = datetime.utcnow() + expires_delta
    else:
        expires_delta = datetime.utcnow() + timedelta(minutes=REFRESH_TOKEN_EXPIRE_MINUTES)
    
    to_encode = {"exp": expires_delta, "sub": str(subject), "username": username}
    encoded_jwt = jwt.encode(to_encode, JWT_REFRESH_SECRET_KEY, ALGORITHM)
    return encoded_jwt