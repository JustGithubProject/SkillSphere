from authentication.schemas import UserOut
from authentication.custom_exceptions import not_enough_rights_exception


async def check_is_user_a_course_staff(
    user: UserOut,
    instructors: list,
    creator_id: int
) -> bool:
    if not (
        user.admin  
        or user.id == creator_id  
        or user.id in [instructor.id for instructor in instructors]
    ):
        raise not_enough_rights_exception
    return True