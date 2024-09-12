from datetime import datetime
from pydantic import BaseModel, ConfigDict

from authentication.schemas import UserBase


class CommentBase(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    content: str
    parent_id: int | None = None  # Для ответа на комментарий, может быть пустым
    course_id: int
    user_id: int


class CommentInput(CommentBase):
    pass


class CommentOutput(CommentInput):
    id: int
    replies: list['CommentOutput'] = []  # Список ответов на комментарий
    created_at: datetime
    updated_at: datetime
    user: "UserBase"


class CommentUpdate(BaseModel):
    content: str