from pydantic import BaseModel, ConfigDict

from answer.schemas import AnswerOutput


class TestBase(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    step_id: int

class TestInput(TestBase):
    pass


class TestUpdate(BaseModel):
    count_correct_answers: int


class TestOutput(TestInput):
    id: int
    answers: list['AnswerOutput']
    count_correct_answers: int

