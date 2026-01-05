from sqlite3 import Connection
from typing import Optional
from src.models.user import User
from src.core.database.db import connection


def create_table():
    cur = connection.cursor()
    cur.execute("""
        CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        username TEXT NOT NULL UNIQUE,
        password TEXT NOT NULL,
        email TEXT NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        );
    """)


def create_user(username, email, password) -> User:
    with connection:
        query = connection.cursor()
        query.execute(
            """
            INSERT INTO users (username, email, password) VALUES (?, ?, ?)
        """,
            (username, email, password),
        )
        user = get_user_by_name(username)
        if user is None:
            raise Exception("User creation failed. User not found.")
        return user


def get_user(user_id: int) -> Optional[User]:
    query = connection.cursor()
    query.execute(
        "SELECT id, username, email, password FROM users WHERE id = ?", (user_id,)
    )
    row = query.fetchone()
    if row:
        return User(id=row[0], username=row[1], email=row[2], password=row[3])
    return None


def get_user_by_name(username: str) -> Optional[User]:
    query = connection.cursor()
    query.execute(
        "SELECT id, username, email, password FROM users WHERE username = ?",
        (username,),
    )
    row = query.fetchone()
    if row:
        return User(id=row[0], username=row[1], email=row[2], password=row[3])
    return None


def update_user(user: User) -> None:
    with connection:
        query = connection.cursor()
        query.execute(
            """
            UPDATE users SET username = ?, email = ?, password = ? WHERE id = ?
        """,
            (user.username, user.email, user.password, user.id),
        )
