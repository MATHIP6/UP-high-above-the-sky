from fastapi import APIRouter, HTTPException, Response
from pydantic import BaseModel

from src.core import security
from src.core.database.crud import users
from src.models.user import User


class LoginCredentials(BaseModel):
    username: str
    password: str


router = APIRouter()


@router.post("/login")
async def register(creds: LoginCredentials, response: Response):
    user = users.get_user_by_name(creds.username)
    if not user:
        raise HTTPException(status_code=400, detail="Invalid username or password")
    if user.password != creds.password:
        raise HTTPException(status_code=400, detail="Invalid username or password")
    token = security.create_token({"sub": str(user.id)})
    res_token = security.TokenResponse(access_token=token, token_type="bearer")
    # return res_token
    response.set_cookie("access_token", token)
    return res_token
