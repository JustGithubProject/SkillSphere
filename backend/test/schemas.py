from pydantic import BaseModel, ConfigDict


class TestBase(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    step_id: int
    count_correct_answers: int = 0


class TestInput(TestBase):
    pass


class TestOutput(TestInput):
    id: int
    # answers: list['AnswerOutput']

