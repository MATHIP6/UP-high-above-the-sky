from enum import Enum
from typing import Optional


class Role(Enum):
    USER = "user"
    ADMIN = "admin"


def get_role_from_string(role_name: str) -> Role:
    role_dict = {role.value: role for role in Role}
    return role_dict.get(role_name) or get_default_role()


def get_default_role() -> Role:
    return Role.USER


class User:
    def __init__(self, id: str, username: str, role: Role, email: str, password: str):
        self.id = id
        self.username = username
        self.role = role
        self.email = email
        self.password = password
