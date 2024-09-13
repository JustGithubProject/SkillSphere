from datetime import datetime
import random
from redis_cache import RedisCache
from database.models import User
from repositories.user_repository import UserRepository
from sqlalchemy.ext.asyncio import AsyncSession
from authentication.schemas import UserIn, UserOut
from authentication.custom_exceptions import (
    failted_to_created_user_exception, 
    user_not_found_exception,
    not_enough_rights_exception
)
from utils import send_code
from authentication.enums import UserAction
from authentication.utils import generate_random_password



class UserService:
    def __init__(self, user_repository: UserRepository):
        """
        Initialize the course service with a course repository.
        """
        self.user_repository = user_repository

    async def send_code(
        self,
        email: str,
        redis_helper: RedisCache
    ) -> dict:
        code = str(random.randint(100000, 999999))
        await send_code(email, code)
        await redis_helper.set(key=email, value=code)
        return {"code": code}


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
        except Exception:
            raise failted_to_created_user_exception
    
    async def google_register_user(
        self,
        session: AsyncSession,
        username: str,
        first_name: str,
        last_name: str,
        email: str,
    ) -> None:
        try:
            await self.user_repository.create_user(
                session,
                username=username,
                first_name=first_name,
                last_name=last_name,
                email=email,
                password_hash=generate_random_password()
            )
        
        except Exception:
            raise failted_to_created_user_exception

    
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
    
    async def update_last_login(
        self,
        user_id: int,
        session: AsyncSession,
        new_login_time: datetime
    ) -> None:
        return await self.user_repository.update_last_login(
            user_id=user_id,
            session=session,
            new_login_time=new_login_time,
        )
        

# Зависимость для получения сервиса
def get_user_service():
    return UserService(UserRepository())