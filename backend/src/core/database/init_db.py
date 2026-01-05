from src.core.database.db import connection
from src.core.database.crud import users


def init():
    users.create_table()
    print("Created all databases")
