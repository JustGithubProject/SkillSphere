from pydantic import BaseModel, ConfigDict

from lesson.schemas import LessonOutput


class ModuleBase(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    title: str
    description: str | None = None
    course_id: int


class ModuleInput(ModuleBase):
    pass


class ModuleOutput(ModuleInput):
    id: int
    lessons: list["LessonOutput"]


class ModuleUpdate(BaseModel):
    title: str | None = None
    description: str | None = None
