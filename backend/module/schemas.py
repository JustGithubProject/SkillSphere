from pydantic import BaseModel, ConfigDict


class ModuleBase(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    title: str
    description: str
    course_id: int


class ModuleInput(ModuleBase):
    pass


class ModuleOutput(ModuleInput):
    id: int
    # total_points: int TODO: UNCOMMENT IF NEEDEED

    # lessons: list["LessonBase"]


class ModuleUpdate(BaseModel):
    title: str | None = None
    description: str | None = None