from datetime import datetime
from typing import List, Optional
from src.core.database.db import connection
from src.models.order import Order
from src.core.utils import generate_order_id


def create_table():
    cur = connection.cursor()
    cur.execute("""
        CREATE TABLE IF NOT EXISTS orders (
        id TEXT PRIMARY KEY NOT NULL,
        user_id INTEGER NOT NULL,
        created_date INTEGER NOT NULL,
        total_price REAL NOT NULL,
        status TEXT NOT NULL,
        FOREIGN KEY (user_id) REFERENCES users(id)
        );
    """)
    connection.commit()


def create(order: Order):
    cur = connection.cursor()
    id = generate_order_id()
    order.id = id
    cur.execute(
        """
        INSERT INTO orders (id, user_id, created_date, total_price, status)
        VALUES (?, ?, ?, ?, ?);
        """,
        (
            id,
            order.user_id,
            order.created_date.timestamp(),
            order.total_price,
            order.status,
        ),
    )
    connection.commit()
    return order


def get(id: str) -> Optional[Order]:
    cur = connection.cursor()
    cur.execute("SELECT * FROM orders WHERE id = ?;", (id,))
    row = cur.fetchone()
    if row:
        return Order(
            id=row[0],
            user_id=row[1],
            created_date=datetime.fromtimestamp(row[2]),
            total_price=row[3],
            status=row[4],
        )
    return None


def get_all() -> List[Order]:
    cur = connection.cursor()
    cur.execute("SELECT * FROM orders;")
    rows = cur.fetchall()
    return [
        Order(
            id=row[0],
            user_id=row[1],
            created_date=datetime.fromtimestamp(row[2]),
            total_price=row[3],
            status=row[4],
        )
        for row in rows
    ]


def get_all_by_user_id(user_id) -> List[Order]:
    cur = connection.cursor()
    cur.execute("SELECT * FROM orders WHERE user_id = ?;", (user_id,))
    rows = cur.fetchall()
    return [
        Order(
            id=row[0],
            user_id=row[1],
            created_date=datetime.fromtimestamp(row[2]),
            total_price=row[3],
            status=row[4],
        )
        for row in rows
    ]


def update(order: Order):
    cur = connection.cursor()
    cur.execute(
        """
        UPDATE orders
        SET created_date = ?, total_price = ?, status = ?
        WHERE id = ?;
        """,
        (order.created_date.timestamp(), order.total_price, order.status, order.id),
    )
    connection.commit()


def delete(id: str):
    cur = connection.cursor()
    cur.execute("DELETE FROM orders WHERE id = ?;", (id,))
    connection.commit()
