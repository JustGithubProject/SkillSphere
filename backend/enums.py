from enum import Enum


class FileType(Enum):
    VIDEO = "video"
    IMAGE = "image"
    

class Currency(str, Enum):
    USD = "USD"
    EUR = "EUR"
    UAH = "UAH"