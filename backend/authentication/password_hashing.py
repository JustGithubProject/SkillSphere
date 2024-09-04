from passlib.context import CryptContext


# Initialize CryptContext for password hashing
password_context = CryptContext(schemes=["bcrypt"], deprecated="auto")


def get_hashed_password(password: str) -> str:
    """Generate hash password by password"""
    return password_context.hash(password)


def verify_password(password: str, hashed_password: str) -> bool:
    """Check password and hashed_password"""
    return password_context.verify(password, hashed_password)