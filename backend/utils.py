from authentication.schemas import UserOut
from database.models import Course
from authentication.custom_exceptions import not_enough_rights_exception


async def check_is_user_a_course_staff(
    user: UserOut,
    course: Course
) -> bool:
    if not (
        user.admin  
        or user.id == course.creator_id  
        or user.id in [instructor.id for instructor in course.instructors]
    ):
        raise not_enough_rights_exception
    return True