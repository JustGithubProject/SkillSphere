from pydantic import BaseModel, ConfigDict


class ModuleBase(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    title: str
    description: str
    course_id: int


class ModuleInput(ModuleBase):
    pass


class ModuleOutput(ModuleInput):
    total_points: int

    # lessons: list["LessonBase"]


class ModuleUpdate(BaseModel):
    title: str | None
    description: str | None