from pydantic import BaseModel, ConfigDict

from test.schemas import TestOutput


class StepBase(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    video_path: str | None = None
    text: str
    lesson_id: int


class StepInput(StepBase):
    pass


class StepOutput(StepInput):
    id: int
    test: TestOutput | None = None


class StepUpdate(BaseModel):
    video_path: str | None = None
    text: str | None = None