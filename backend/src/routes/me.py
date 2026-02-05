from typing import Annotated
from fastapi import APIRouter, Cookie

from src.core.security import get_current_user
from src.models.user import User

router = APIRouter()


@router.get("/me")
async def get_profile(access_token: Annotated[str | None, Cookie()]):
    user: User = await get_current_user(access_token)
    user.password = ""
    return user
