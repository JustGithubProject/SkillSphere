from fastapi import APIRouter


router = APIRouter(
    prefix="/user",
    tags=["User Operations"]
)


@router.post("/signup")
async def create_user():
    # 1. Getting user by email
    # Code to get user by email
