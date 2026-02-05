from datetime import datetime
from typing import Optional


class Order:
    def __init__(
        self,
        id: Optional[str],
        user_id: str,
        created_date: datetime,
        total_price: float,
        status: str,
    ):
        self.id = id
        self.user_id = user_id
        self.created_date = created_date
        self.total_price = total_price
        self.status = status
