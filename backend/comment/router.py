from typing import Annotated
from fastapi import APIRouter, Depends, status
from authentication.validation import get_current_active_auth_user
from sqlalchemy.ext.asyncio import AsyncSession
from authentication.schemas import UserOut
from services.comment_service import CommentService, get_comment_service
from comment.schemas import CommentOutput, CommentInput, CommentUpdate
from database import session_getter


router = APIRouter(
    prefix="/comment",
    tags=["Comment Operations"]
)


@router.get("/all/{course_id}/", response_model=list[CommentOutput])
async def get_comments_by_course_id(
    session: Annotated[AsyncSession, Depends(session_getter)],
    comment_service: Annotated[CommentService, Depends(get_comment_service)],
    course_id: int,
) -> list[CommentOutput]:
    return await comment_service.get_comments_by_course_id(
        session=session,
        course_id=course_id
    )

@router.post("/", response_model=CommentOutput, status_code=status.HTTP_201_CREATED)
async def create_comment(
    session: Annotated[AsyncSession, Depends(session_getter)],
    comment_service: Annotated[CommentService, Depends(get_comment_service)],
    user: Annotated[UserOut, Depends(get_current_active_auth_user)],
    comment_input: CommentInput
) -> CommentOutput:
    return await comment_service.create_comment(
        session=session,
        user=user,
        comment_input=comment_input
    )