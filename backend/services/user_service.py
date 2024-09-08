from datetime import datetime
from database.models import User
from repositories.user_repository import UserRepository
from sqlalchemy.ext.asyncio import AsyncSession
from authentication.schemas import UserIn, UserOut
from authentication.custom_exceptions import (
    UserCreateException, 
    user_not_found_exception,
    not_enough_rights_exception
)

from authentication.enums import UserAction


class UserService:
    def __init__(self, user_repository: UserRepository):
        """
        Initialize the course service with a course repository.
        """
        self.user_repository = user_repository

    async def register_user(
        self,
        session: AsyncSession, 
        user_in: UserIn,
    ) -> int:
        try:
            new_user_id = await self.user_repository.create_user(
                session=session,
                **user_in.model_dump()
            )
            return new_user_id
        except UserCreateException as ex:
            return f"{ex}: failure to create new user"

    
    async def get_user_by_email(
        self,
        session: AsyncSession, 
        email: str,
    ) -> UserOut:
        user: User = await self.user_repository.get_user_by_email(
            session=session, 
            email=email
        )
        if user:
            return UserOut.model_validate(obj=user, from_attributes=True)
        return None
    
    async def get_user_by_username(
        self,
        session: AsyncSession,
        username: str
    ) -> UserOut:
        user: User = await self.user_repository.get_user_by_username(
            session=session,
            username=username
        )
        if user:
            return UserOut.model_validate(obj=user, from_attributes=True)
        return None
    

    async def list_users(
        self,
        session: AsyncSession,
        skip: int,
        limit: int,
    ) -> list[UserOut]:
        users: list[User] = await self.user_repository.get_all_users(
            session=session,
            skip=skip,
            limit=limit
        )
        users_schemas = [UserOut.model_validate(user, from_attributes=True) for user in users]
        return users_schemas
    

    async def update_user_ban_status_by_email(
        self,
        session: AsyncSession, 
        admin: UserOut, 
        email: str,
        action: UserAction,
    ) -> UserOut:
        # Get user by email
        user: UserOut = await self.get_user_by_email(
            session=session,
            email=email
        )
        admin: UserOut = self.get_user_by_email(
            session=session,
            email=admin.email
        )
        if not admin.admin or user.admin:
            raise not_enough_rights_exception
        if not user:
            raise user_not_found_exception
        user = await self.user_repository.update_user_ban_status(
            session=session,
            user=user,
            action=action
        )
        user_schema = UserOut.model_validate(obj=user, from_attributes=True)
        return {
            "action": action,
            "user": {
                **user_schema.model_dump()
            },
            "at_time": datetime.now(),
            "made_by": {
                **admin.model_dump()
            }
        }

    async def check_user_is_admin(
        self,
        user_in: UserIn,
        session: AsyncSession,
    ) -> bool:
        user: UserOut = await self.get_user_by_email(
            session=session, 
            email=user_in.email
        )
        return user.admin
        

# Зависимость для получения сервиса
def get_user_service():
    return UserService(UserRepository())