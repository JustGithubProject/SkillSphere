from sqlalchemy import select, update
from sqlalchemy.ext.asyncio import AsyncSession
from authentication.schemas import UserOut
from authentication.utils import hash_password
from authentication.custom_exceptions import (
    UserCreateException,
    update_ban_status_exception
)
from database.models import User
from authentication.enums import UserAction


class UserRepository:
    async def create_user(
        session: AsyncSession,
        username: str,
        email: str,
        password_hash: str
    ) -> int:
        try:
            new_user: User = User(
                username=username,
                email=email,
                password_hash=hash_password(password_hash)
            )
            session.add(new_user)
            session.commit()
            return new_user.id
        except Exception:
            raise UserCreateException()
        
    async def get_user_by_email(session: AsyncSession, email: str) -> User | None:
        stmt = select(User).where(User.email==email)
        user: User = session.scalars(stmt).one_or_none()
        return user
    
    
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
        users: list[User] = session.scalars(stmt).all()
        return users


    async def update_user_ban_status(
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
            session.scalars(stmt)
            session.commit()
            # Получение обновленного объекта
            updated_user = session.query(User).filter_by(email=user.email).one()
            return updated_user
        except Exception:
            session.rollback()
            raise update_ban_status_exception

        


# Зависимость для получения репозитория
def get_user_repository() -> UserRepository:
    return UserRepository