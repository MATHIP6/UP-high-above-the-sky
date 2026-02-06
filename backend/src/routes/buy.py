from datetime import datetime
from sqlite3 import adapt
from typing import Annotated, Optional

from starlette.status import HTTP_400_BAD_REQUEST, HTTP_404_NOT_FOUND
from src.core.database.crud import carts as db_carts, orders, products
from src.core.database.crud import products as db_products
from src.core.database.crud import promo_codes as db_promo
from src.core.database.crud import orders as db_orders
from fastapi import APIRouter, Cookie, HTTPException, status

from src.core.security import get_current_user
from src.models.order import Order
from src.models.user import User

router = APIRouter()


@router.post("/buy")
async def buy(
    access_token: Annotated[str | None, Cookie()], promo_id: Optional[str] = None
):
    user: User = await get_current_user(access_token)
    cart = db_carts.get_by_user(user.id)
    total_price = 0.0
    if len(cart) == 0:
        raise HTTPException(HTTP_404_NOT_FOUND, "There are no items in your cart")
    for e in cart:
        product = db_products.get(e.product_id)
        total_price += product.price
    if promo_id:
        promo = db_promo.get(promo_id)
        if not promo:
            raise HTTPException(HTTP_404_NOT_FOUND, "Invalid promo code")
        match promo.type:
            case "AMOUNT":
                total_price -= promo.value
            case "PERCENT":
                total_price = (total_price * promo.value) // 100
            case _:
                raise HTTPException(
                    HTTP_400_BAD_REQUEST, f"Unhandled promo code with type {promo.type}"
                )
    order = orders.create(
        Order(None, user.id, datetime.now(), total_price, "EN_PREPARATION")
    )
    db_carts.clear_by_user(user.id)
    return {"success": True, "order": order}
    # carts = crud.get_all(user.id)
