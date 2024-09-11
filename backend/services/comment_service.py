from authentication.schemas import UserOut
from repositories.comment_repository import CommentRepository
from comment.schemas import CommentInput, CommentOutput
from course.schemas import CourseOutput
from services.course_service import CourseService, get_course_service
from repositories.course_repository import CourseRepository
from sqlalchemy.ext.asyncio import AsyncSession
from database.models import Comment
from authentication.custom_exceptions import not_enough_rights_exception


class CommentService:
    def __init__(
        self, 
        comment_repository: CommentRepository, 
        course_repository: CourseRepository,
        course_service: CourseService = get_course_service()
    ):
        self.comment_repository = comment_repository
        self.course_repository = course_repository
        self.course_service = course_service

    async def get_comments_by_course_id(
        self,
        session: AsyncSession,
        course_id: int
    ) -> list[CommentOutput]:
        course: CourseOutput = await self.course_service.get_course_by_id_no_auth(
            session=session,
            course_id=course_id
        )
        return course.comments

    async def create_comment(
        self,
        session: AsyncSession,
        comment_input: CommentInput,
        user: UserOut
    ) -> CommentOutput:
        if user.id != comment_input.user_id:
            raise not_enough_rights_exception
        
        comment: Comment = await self.comment_repository.create_comment(
            session=session,
            comment_input=comment_input
        )
        return CommentOutput.model_validate(comment, from_attributes=True)
        

def get_comment_service():
    return CommentService(CommentRepository(), CourseRepository())