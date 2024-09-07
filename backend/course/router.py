from typing import Annotated
from fastapi import APIRouter, Depends, Query, status
from authentication.schemas import UserOut
from authentication.validation import get_current_active_auth_user
from services.course_service import CourseService, get_course_service
from enums import CourseLevel
from course.schemas import CourseInput, CourseOutput, CourseUpdate
from sqlalchemy.ext.asyncio import AsyncSession
from database import session_getter


router = APIRouter(
    prefix="/course",
    tags=["Course Operations"]
)


@router.get("/all/", response_model=list[CourseOutput])
async def get_all_courses(
    course_service: Annotated[CourseService, Depends(get_course_service)],
    session: Annotated[AsyncSession, Depends(session_getter)],
    user: Annotated[UserOut, Depends(get_current_active_auth_user)],
    skip: int = Query(default=0, ge=0), 
    limit: int = Query(default=10, ge=1),
    title: str = Query(default=None),
    level: "CourseLevel" = Query(default=None),
    price: int = Query(default=None),
) -> list[CourseOutput]:
    return await course_service.get_all_courses(
        session=session,
        skip=skip,
        limit=limit,
        title=title,
        level=level,
        price=price,
        user=user,
    )

@router.post("/", response_model=CourseOutput, status_code=status.HTTP_201_CREATED)
async def create_course(
    course_service: Annotated[CourseService, Depends(get_course_service)],
    user: Annotated[UserOut, Depends(get_current_active_auth_user)],
    session: Annotated[AsyncSession, Depends(session_getter)],
    course_input: CourseInput
) -> CourseOutput:
    return await course_service.create_course(
        session=session,
        course_input=course_input,
        user=user
    )

@router.get("/{course_id}/", response_model=CourseOutput)
async def get_course_by_id(
    course_service: Annotated[CourseService, Depends(get_course_service)],
    session: Annotated[AsyncSession, Depends(session_getter)],
    user: Annotated[UserOut, Depends(get_current_active_auth_user)],
    course_id: int
) -> CourseOutput:
    return await course_service.get_course_by_id(
        session=session,
        course_id=course_id,
        user=user
    )

@router.patch("/{course_id}/", response_model=CourseOutput)
async def update_course(
    course_service: Annotated[CourseService, Depends(get_course_service)],
    session: Annotated[AsyncSession, Depends(session_getter)],
    user: Annotated[UserOut, Depends(get_current_active_auth_user)],
    course_update: CourseUpdate,
    course_id: int,
) -> CourseOutput:
    return await course_service.update_course(
        session=session,
        course_update=course_update,
        course_id=course_id,
        user=user
    )

@router.delete("/{course_id}/", status_code=status.HTTP_204_NO_CONTENT)
async def delete_course(
    course_service: Annotated[CourseService, Depends(get_course_service)],
    session: Annotated[AsyncSession, Depends(session_getter)],
    user: Annotated[UserOut, Depends(get_current_active_auth_user)],
    course_id: int,
) -> None:
    return await course_service.delete_course(
        session=session,
        course_id=course_id,
        user=user
    )

@router.post("/add/instructor/", status_code=status.HTTP_201_CREATED)
async def add_course_instructor(
    course_service: Annotated[CourseService, Depends(get_course_service)],
    session: Annotated[AsyncSession, Depends(session_getter)],
    user: Annotated[UserOut, Depends(get_current_active_auth_user)],
    instructor_id: Annotated[int, Query(ge=1)],
    course_id: Annotated[int, Query(ge=1)]
) -> CourseOutput:
    return await course_service.add_instructor(
        session=session,
        user=user,
        instructor_id=instructor_id,
        course_id=course_id
    )