from sqlalchemy import select
from fastapi import HTTPException, status
from authentication.schemas import UserOut
from comment.schemas import CommentInput, CommentUpdate
from sqlalchemy.ext.asyncio import AsyncSession
from database.models import Comment
from sqlalchemy.orm import selectinload
from authentication.custom_exceptions import not_enough_rights_exception


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
            await session.refresh(comment, attribute_names=['replies', 'user'])
            return comment
        except Exception as e:
            await session.rollback()
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail=f"Can not add comment. Error: {e}"
            )

    async def get_comments_by_course_id(
        self,
        session: AsyncSession,
        course_id: int
    ) -> list[Comment]:
        result = await session.scalars(
            select(Comment)
            .where(Comment.course_id == course_id)
            .where(Comment.parent_id == None)  # Только корневые комментарии
            .options(selectinload(Comment.user), selectinload(Comment.replies))
        )
        
        # Преобразуем результат в список
        comments = result.all()

        # Рекурсивно загружаем все вложенные комментарии
        for comment in comments:
            await self._load_replies(session, comment)

        return comments

    # Рекурсивная функция для загрузки вложенных комментариев
    async def _load_replies(self, session: AsyncSession, comment: Comment):
        # Подгружаем ответы на комментарий
        await session.execute(
            select(Comment)
            .where(Comment.parent_id == comment.id)
            .options(
                selectinload(Comment.user), 
                selectinload(Comment.replies)
            )
        )
        
        # Если есть ответы, рекурсивно для каждого ответа вызываем эту же функцию
        if comment.replies:
            for reply in comment.replies:
                await self._load_replies(session, reply)

    async def update_comment(
        self,
        session: AsyncSession,
        comment_id: int,
        comment_update: CommentUpdate,
        user: UserOut
    ) -> Comment:
        try:
            comment: Comment = await session.get(Comment, comment_id)
            # Проверяем права пользователя
            if comment.user_id != user.id:
                raise not_enough_rights_exception
            # Обновляем комментарий
            comment.content = comment_update.content
            await session.commit()
        except Exception as e:
            await session.rollback()
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail=f"Can not update comment. Error: {e}"
            )
        
    async def delete_comment(
        self,
        session: AsyncSession,
        comment_id: int,
        user: UserOut
    ) -> None:
        try:
            comment: Comment = await session.get(Comment, comment_id)
            if comment.user_id != user.id or not user.admin:
                raise not_enough_rights_exception
            await session.delete(comment)
            await session.commit()
        except Exception as e:
            await session.rollback()
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail=f"Can not delete comment. Error: {e}"
            )