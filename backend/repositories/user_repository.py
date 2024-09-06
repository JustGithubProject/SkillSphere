from typing import AsyncGenerator

from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.exc import NoResultFound

from database.models import User


class UserRepository:
    """
        UserRepository, which will
        be used in UserService to interact with User model
    """
    def __init__(self, session_getter: AsyncGenerator[AsyncSession, None]) -> None:
        self.session_getter = session_getter
    
    async def get_user_by_username(self, username: str) -> User:
        async with self.session_getter() as session:
            result = await session.execute(
                select(User).filter(User.username == username)
            )
            user = result.scalars().first()
            if user is None:
                raise NoResultFound(f"User with username {username} not found")
            return user
    
    async def get_user_by_email(self, email: str) -> User:
        async with self.session_getter() as session:
            result = await session.execute(select(User).filter(User.email == email))
            user = result.scalars().first()
            if user is None:
                raise NoResultFound(f"User with email {email} not found")
            return user
    
    async def create_user(self, username: str, email: str, password_hash: str) -> None:
        async with self.session_getter() as session:
            new_user = User(username=username, email=email, password_hash=password_hash)
            session.add(new_user)
            await session.commit()

