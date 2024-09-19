from enum import Enum


class CourseLevel(Enum):
    BEGINNER = "Beginner"
    INTERMEDIATE = "Intermediate"
    ADVANCED = "Advanced"

class FileType(Enum):
    VIDEO = "video"
    IMAGE = "image"
    

class Currency(Enum):
    USD = "USD"
    EUR = "EUR"
    UAH = "UAH"