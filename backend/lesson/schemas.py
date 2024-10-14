from pydantic import BaseModel, ConfigDict


class LessonBase(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    title: str
    description: str | None = None
    module_id: int


class LessonInput(LessonBase):
    pass


class LessonOutput(LessonBase):
    id: int
    # steps: list["StepOutput"]


class LessonUpdate(BaseModel):
    title: str | None = None
    description: str | None = None