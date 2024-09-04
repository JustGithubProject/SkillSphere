from enum import Enum


class Role(Enum):
    TEACHER = "teacher"
    USER = "user"
    ADMIN = "admin"
    GUEST = "guest"