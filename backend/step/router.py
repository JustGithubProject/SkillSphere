import os
import uuid
import shutil
from typing import Annotated

from fastapi import APIRouter, Depends, File, UploadFile, status, Form
from authentication.validation import get_current_active_auth_user
from database.database import session_getter
from sqlalchemy.ext.asyncio import AsyncSession
from authentication.schemas import UserOut
from step.schemas import StepInput, StepOutput, StepUpdate
from services.step_service import StepService, get_step_service


router = APIRouter(
    prefix="/step",
    tags=["Step Operations"]
)


@router.get("/all/{lesson_id}/", response_model=list[StepOutput])
async def get_all_steps_by_lesson_id(
    step_service: Annotated[StepService, Depends(get_step_service)],
    session: Annotated[AsyncSession, Depends(session_getter)],
    user: Annotated[UserOut, Depends(get_current_active_auth_user)],
    lesson_id: int
) -> list[StepOutput]:
    return await step_service.get_all_steps_by_lesson_id(
        session=session,
        lesson_id=lesson_id
    )

@router.get("/{step_id}/", response_model=StepOutput)
async def get_step_by_id(
    step_service: Annotated[StepService, Depends(get_step_service)],
    session: Annotated[AsyncSession, Depends(session_getter)],
    user: Annotated[UserOut, Depends(get_current_active_auth_user)],
    step_id: int
) -> StepOutput:
    return await step_service.get_step_by_id(
        session=session,
        step_id=step_id
    )
    
"""

    category: Annotated[Category, Form()],
    photo_file: UploadFile | None = File(default=None),
    video_file: UploadFile | None = File(default=None)


"""

@router.post("/", response_model=StepOutput, status_code=status.HTTP_201_CREATED)
async def create_step_in_lesson(
    step_service: Annotated[StepService, Depends(get_step_service)],
    session: Annotated[AsyncSession, Depends(session_getter)],
    user: Annotated[UserOut, Depends(get_current_active_auth_user)],
    text: Annotated[str, Form()],
    lesson_id: Annotated[int, Form()],
    video_path: UploadFile | None = File(default=None),
) -> StepOutput:
    result_video_path = None
    SHARED_DIRECTORY_PATH = "/shared_data/uploads"
    VIDEO_DIRECTORY = os.path.join(SHARED_DIRECTORY_PATH, "videos_of_steps")
    
    # Creating directories if they don't exist
    os.makedirs(VIDEO_DIRECTORY, exist_ok=True)
    
    if video_path:
        random_uuid_string = uuid.uuid4()
        file_extension = video_path.filename.split(".")[-1]
        result_video_path = os.path.join(
            VIDEO_DIRECTORY,
            f"{random_uuid_string}.{file_extension}"
        )
        with open(result_video_path, "wb") as buffer:
            shutil.copyfileobj(video_path.file, buffer)
    
    return await step_service.create_step(
        session=session,
        step_input=StepInput(
            text=text,
            lesson_id=lesson_id,
            video_path=result_video_path
        )
    )

@router.patch("/{step_id}/", response_model=StepOutput, status_code=status.HTTP_202_ACCEPTED)
async def update_step(
    step_service: Annotated[StepService, Depends(get_step_service)],
    session: Annotated[AsyncSession, Depends(session_getter)],
    user: Annotated[UserOut, Depends(get_current_active_auth_user)],
    step_id: int,
    text: Annotated[str, Form()],
    video_path: UploadFile | None = File(default=None),

) -> StepOutput:
    # TODO: do like create_step_in_lesson
    
    result_video_path = None
    SHARED_DIRECTORY_PATH = "/shared_data/uploads"
    VIDEO_DIRECTORY = os.path.join(SHARED_DIRECTORY_PATH, "videos_of_steps")
    
    # Creating directories if they don't exist
    os.makedirs(VIDEO_DIRECTORY, exist_ok=True)
    
    if video_path:
        random_uuid_string = uuid.uuid4()
        file_extension = video_path.filename.split(".")[-1]
        result_video_path = os.path.join(
            VIDEO_DIRECTORY,
            f"{random_uuid_string}.{file_extension}"
        )
        with open(result_video_path, "wb") as buffer:
            shutil.copyfileobj(video_path.file, buffer)

    return await step_service.update_step(
        session=session,
        step_update=StepUpdate(
            text=text,
            video_path=result_video_path
        ),
        step_id=step_id
    )

@router.delete("/{step_id}/", status_code=status.HTTP_204_NO_CONTENT)
async def delete_step(
    step_service: Annotated[StepService, Depends(get_step_service)],
    session: Annotated[AsyncSession, Depends(session_getter)],
    user: Annotated[UserOut, Depends(get_current_active_auth_user)],
    step_id: int
) -> None:
    return await step_service.delete_step(
        session=session,
        step_id=step_id
    )