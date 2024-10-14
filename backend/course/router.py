import os
import shutil
import logging
import uuid


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
from authentication.schemas import UserOut
from authentication.validation import get_current_active_auth_user
from services.course_service import CourseService, get_course_service
from enums import FileType
from course.schemas import CourseOutput
from sqlalchemy.ext.asyncio import AsyncSession
from database import session_getter
from course.enums import Category, CourseLevel


router = APIRouter(
    prefix="/course",
    tags=["Course Operations"]
)

logger = logging.getLogger(__name__)
logging.basicConfig(level=logging.INFO)

@router.get("/", response_model=list[CourseOutput])
async def search_courses(
    course_service: Annotated[CourseService, Depends(get_course_service)],
    session: Annotated[AsyncSession, Depends(session_getter)],
    search: str | None = Query(default=None),
    is_free: bool = Query(default=False)
) -> list[CourseOutput]:
    return await course_service.search_courses(
        session=session,
        search=search,
        is_free=is_free
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
    category: "Category" = Query(),
    price: int = Query(default=None),
) -> list[CourseOutput]:
    return await course_service.get_all_courses(
        session=session,
        skip=skip,
        limit=limit,
        title=title,
        level=level,
        price=price,
        category=category,
        user=user,
    )

@router.get("/all/no-auth/", response_model=list[CourseOutput])
async def get_all_courses_no_auth(
    course_service: Annotated[CourseService, Depends(get_course_service)],
    session: Annotated[AsyncSession, Depends(session_getter)],
    limit: int = Query(default=10, ge=1)
) -> list[CourseOutput]:
    return await course_service.fetch_all_courses_no_auth(
        session=session,
        limit=limit
    )

@router.post("/", response_model=CourseOutput, status_code=status.HTTP_201_CREATED)
async def create_course(
    course_service: Annotated[CourseService, Depends(get_course_service)],
    user: Annotated[UserOut, Depends(get_current_active_auth_user)],
    session: Annotated[AsyncSession, Depends(session_getter)],
    title: Annotated[str, Form()],
    description: Annotated[str, Form()],
    price: Annotated[int, Form()],
    level: Annotated[CourseLevel, Form()],
    category: Annotated[Category, Form()],
    photo_file: UploadFile | None = File(default=None),
    video_file: UploadFile | None = File(default=None)
) -> CourseOutput:
    
    ################################################################
    # TODO: ВЫНЕСТИ В ОТДЕЛЬНУЮ ФУНКЦИЮ
    photo_path = None
    video_path = None
    
    SHARED_DIRECTORY_PATH = "/shared_data/uploads"
    PHOTO_DIRECTORY = os.path.join(SHARED_DIRECTORY_PATH, "photos")
    VIDEO_DIRECTORY = os.path.join(SHARED_DIRECTORY_PATH, "videos")
    
    # Creating directories if they don't exist
    os.makedirs(PHOTO_DIRECTORY, exist_ok=True)
    os.makedirs(VIDEO_DIRECTORY, exist_ok=True)
    
    if photo_file:
        random_uuid_string = uuid.uuid4()
        file_extension = photo_file.filename.split(".")[-1]
        photo_path = os.path.join(
            PHOTO_DIRECTORY,
            f"{random_uuid_string}.{file_extension}"
        )
        with open(photo_path, "wb") as buffer:
            shutil.copyfileobj(photo_file.file, buffer)

    if video_file:
        random_uuid_string = uuid.uuid4()
        file_extension = video_file.filename.split(".")[-1]
        video_path = os.path.join(
            VIDEO_DIRECTORY,
            f"{random_uuid_string}.{file_extension}"
        )
        with open(video_path, "wb") as buffer:
            shutil.copyfileobj(video_file.file, buffer)
    ###########################################################
    
    return await course_service.create_course(
        session=session,
        title=title,
        description=description,
        price=price,
        level=level,
        category=category,
        photo_file=photo_path,
        video_file=video_path,
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
    
@router.get("/no-auth/{course_id}", response_model=CourseOutput)
async def get_course_by_id_no_auth(
    course_service: Annotated[CourseService, Depends(get_course_service)],
    session: Annotated[AsyncSession, Depends(session_getter)],
    course_id: int
) -> CourseOutput:
    return await course_service.get_course_by_id_no_auth(
        session=session,
        course_id=course_id
    )

@router.get("/my/created/courses", response_model=list[CourseOutput])
async def get_my_created_courses(
    course_service: Annotated[CourseService, Depends(get_course_service)],
    session: Annotated[AsyncSession, Depends(session_getter)],
    user: Annotated[UserOut, Depends(get_current_active_auth_user)],
) -> list[CourseOutput]:
    logger.info("Fetching courses for user: %s", user.id)
    return await course_service.get_courses_created_by_user(
        session=session,
        user_id=user.id
    )

@router.patch("/{course_id}/", response_model=CourseOutput)
async def update_course(
    course_id: int,
    course_service: Annotated[CourseService, Depends(get_course_service)],
    session: Annotated[AsyncSession, Depends(session_getter)],
    user: Annotated[UserOut, Depends(get_current_active_auth_user)],
    title: str | None = Form(default=None),
    description: str | None = Form(default=None),
    is_published: bool | None = Form(default=None),
    price: int | None = Form(default=None),
    level: CourseLevel | None = Form(default=None),
    photo_file: UploadFile | None = File(default=None),
    video_file: UploadFile | None = File(default=None)
) -> CourseOutput:
    return await course_service.update_course(
        session=session,
        title=title,
        description=description,
        price=price,
        level=level,
        photo_file=photo_file,
        video_file=video_file,
        is_published=is_published,
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


@router.get("/download/{course_id}/")
async def download_video_or_photo(
    course_id: int,
    session: Annotated[AsyncSession, Depends(session_getter)],
    user: Annotated[UserOut, Depends(get_current_active_auth_user)],
    file_type: Annotated[FileType, Query()], 
    course_service: Annotated[CourseService, Depends(get_course_service)],
) -> Response:
    course: CourseOutput = await course_service.get_course_by_id(
        course_id=course_id,
        session=session,
        user=user,
    )
    file_route: str = course.video_url if file_type.VIDEO else course.photo_url
    contents = await course_service.download_video_or_photo_file(
        file_name=file_route,
    )
    file_name: str = file_route.split("/")[-1]
    return Response(
        content=contents,
        headers={
            'Content-Disposition': f'attachment;filename={file_name}',
            'Content-Type': 'application/octet-stream',
        }
    )