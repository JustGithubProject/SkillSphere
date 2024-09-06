from repositories.user_repository import UserRepository

from database.models import User


class UserService:
    def __init__(self, user_repository: UserRepository) -> None:
        """
        Initialize the course service with a course repository.
        """
        self.user_repository = user_repository

    async def get_user_by_username(self) -> User:
        pass
    
    async def get_user_by_email(self) -> User: