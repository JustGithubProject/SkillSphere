from typing import Annotated

from fastapi import (
    APIRouter,
    Depends,
    File,
    Form,
    Query,
    Response,
    UploadFile,
    status
)

from sqlalchemy.ext.asyncio import AsyncSession

from authentication.schemas import UserOut
from authentication.validation import get_current_active_auth_user
from database.database import session_getter
from schemas import (
    LessonOutput,
    LessonInput
)

from services.lesson_service import (
    LessonService,
    get_lesson_service
)


router = APIRouter(
    prefix="/lesson",
    tags=["Lessons Operations"]
)

@router.post("/", response_model=LessonOutput, status_code=status.HTTP_201_CREATED)
async def create_lesson(
    session: Annotated[AsyncSession, Depends(session_getter)],
    lesson_service: Annotated[LessonService, Depends(get_lesson_service)],
    title: Annotated[str, Form()],
    description: Annotated[str, Form()],
    module_id: Annotated[int, Form()]
):
    return await lesson_service.create_lesson(
        session=session,
        lesson_input=LessonInput(
            title=title,
            description=description,
            module_id=module_id
        )
    )