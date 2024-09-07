from fastapi import HTTPException, status
from sqlalchemy import select, update
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.orm import selectinload
from authentication.schemas import UserOut
from authentication.utils import hash_password
from authentication.custom_exceptions import (
    failted_to_created_user_exception,
    update_ban_status_exception
)
from database.models import User
from authentication.enums import UserAction


class UserRepository:
    async def create_user(
        self,
        session: AsyncSession,
        username: str,
        first_name: str,
        last_name: str,
        email: str,
        password_hash: str
    ) -> int:
        try:
            new_user: User = User(
                username=username,
                email=email,
                first_name=first_name,
                last_name=last_name,
                password_hash=hash_password(password_hash)
            )
            session.add(new_user)
            await session.commit()
            return new_user.id
        except Exception:
            await session.rollback()
            raise failted_to_created_user_exception
        
    async def get_user_by_email(self, session: AsyncSession, email: str) -> User:
        stmt = select(User).where(User.email==email)
        user: User = await session.scalars(stmt)
        return user.one_or_none()
    
    
    async def get_all_users(
        session: AsyncSession,
        skip: int,
        limit: int
    ) -> list[User]:
        stmt = (
            select(User)
            .offset(skip)
            .limit(limit)
            .order_by(User.id)
        )
        users: list[User] = await session.scalars(stmt).all()
        return users


    async def update_user_ban_status(
        self,
        session: AsyncSession,  
        user: UserOut,
        action: UserAction
    ) -> User:
        new_active_status = action == UserAction.UNBAN
        try:
            stmt = (
                update(User)
                .values(active=new_active_status)
                .where(User.email==user.email)
                .execution_options(synchronize_session="fetch")
            )
            await session.scalars(stmt)
            await session.commit()
            # Получение обновленного объекта
            updated_user = await session.query(User).filter_by(email=user.email).one()
            return updated_user
        except Exception:
            session.rollback()
            raise update_ban_status_exception

    async def get_instructor_by_id(
        self,
        session: AsyncSession,
        user_id: int
    ) -> User:
        user = await session.scalar(
            select(User).where(User.id == user_id) 
            .options(
                selectinload(User.courses_created),
                selectinload(User.courses_instructed)
            )
        )
        if user:
            return user
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="User not found"
        )


# Зависимость для получения репозитория
def get_user_repository() -> UserRepository:
    return UserRepository