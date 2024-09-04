from typing import Annotated
from fastapi import APIRouter, Depends, Query
from services.course_service import CourseService, get_course_service
from enums import CourseLevel
from course.schemas import CourseOutput
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
    price: str = Query(default=None),
) -> list[CourseOutput]:
    return await course_service.get_all_courses(
        session=session,
        skip=skip,
        limit=limit,
        title=title,
        level=level,
        price=price,
    )