from datetime import datetime
from pydantic import BaseModel, ConfigDict

from authentication.schemas import UserBase
from enums import CourseLevel


class CourseBase(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    title: str
    description: str
    price: int
    level: "CourseLevel"
    creator_id: int


class CourseInput(CourseBase):
    pass


class CourseOutput(CourseInput):
    id: int
    created_at: datetime
    updated_at: datetime
    creator: "UserBase"
    instructors: list["UserBase"] = []


class CourseUpdate(BaseModel):
    title: str | None = None
    description: str | None = None
    price: int | None = None
    level: CourseLevel | None = None