from fastapi import HTTPException, status
from comment.schemas import CommentInput
from sqlalchemy.ext.asyncio import AsyncSession
from database.models import Comment


class CommentRepository:
    async def create_comment(
        self,
        session: AsyncSession,
        comment_input: CommentInput
    ) -> Comment:
        try:
            comment: Comment = Comment(**comment_input.model_dump())
            session.add(comment)
            await session.commit()
            await session.refresh(comment)
            print("COMMENT----------------------------------------------------: ")
            print({column.name: getattr(comment, column.name) for column in comment.__table__.columns})
            return comment
        except Exception as e:
            await session.rollback()
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail=f"Can not add comment. Error: {e}"
            )
