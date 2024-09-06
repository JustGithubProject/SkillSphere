from typing import Annotated
from fastapi import APIRouter, Depends, Query, status
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
    )

@router.post("/", response_model=CourseOutput, status_code=status.HTTP_201_CREATED)
async def create_course(
    course_service: Annotated[CourseService, Depends(get_course_service)],
    session: Annotated[AsyncSession, Depends(session_getter)],
    course_input: CourseInput
) -> CourseOutput:
    return await course_service.create_course(
        session=session,
        course_input=course_input
    )

@router.get("/{course_id}/", response_model=CourseOutput)
async def get_course_by_id(
    course_service: Annotated[CourseService, Depends(get_course_service)],
    session: Annotated[AsyncSession, Depends(session_getter)],
    course_id: int
) -> CourseOutput:
    return await course_service.get_course_by_id(
        session=session,
        course_id=course_id
    )

@router.patch("/{course_id}/", response_model=CourseOutput)
async def update_course(
    course_service: Annotated[CourseService, Depends(get_course_service)],
    session: Annotated[AsyncSession, Depends(session_getter)],
    course_update: CourseUpdate,
    course_id: int,
) -> CourseOutput:
    return await course_service.update_course(
        session=session,
        course_update=course_update,
        course_id=course_id
    )

@router.delete("/{course_id}/", status_code=status.HTTP_204_NO_CONTENT)
async def delete_course(
    course_service: Annotated[CourseService, Depends(get_course_service)],
    session: Annotated[AsyncSession, Depends(session_getter)],
    course_id: int,
) -> None:
    return await course_service.delete_course(
        session=session,
        course_id=course_id
    )