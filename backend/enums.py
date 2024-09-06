from enum import Enum


class Role(Enum):
    USER = "user"
    ADMIN = "admin"
    GUEST = "guest"

class CourseLevel(Enum):
    BEGINNER = "Beginner"
    INTERMEDIATE = "Intermediate"
    ADVANCED = "Advanced"