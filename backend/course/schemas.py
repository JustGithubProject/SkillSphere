from datetime import datetime
from pydantic import BaseModel, ConfigDict

from authentication.schemas import UserBase
# from comment.schemas import CommentOutput
from module.schemas import ModuleOutput
from course.enums import Category, CourseLevel


class CourseBase(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    title: str
    description: str
    price: int
    level: "CourseLevel"
    category: "Category"
    video_url: str | None = None
    photo_url: str | None = None

class CourseInput(CourseBase):
    pass


class CourseOutput(CourseInput):
    id: int
    created_at: datetime
    updated_at: datetime
    creator: "UserBase"
    instructors: list["UserBase"] = []
    modules: list["ModuleOutput"] = []
    students: list["UserBase"] = []
    # comments: list["CommentOutput"] = []


class CourseUpdate(BaseModel):
    title: str | None = None
    description: str | None = None
    price: int | None = None
    level: CourseLevel | None = None
    category: Category | None = None
    is_published: bool | None = None
    video_url: str | None = None
    photo_url: str | None = None