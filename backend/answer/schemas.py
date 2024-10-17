from pydantic import BaseModel, ConfigDict


class AnswerBase(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    text: str
    is_correct: bool = False
    test_id: int


class AnswerInput(AnswerBase):
    pass


class AnswerOutput(AnswerInput):
    id: int


class AnswerUpdate(BaseModel):
    text: str | None = None
    is_correct: bool | None = None