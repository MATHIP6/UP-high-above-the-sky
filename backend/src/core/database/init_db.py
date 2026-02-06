from src.core.database.crud import orders, products, promo_codes, users, carts, orders


def init():
    users.create_table()
    products.create_table()
    promo_codes.create_table()
    carts.create_table()
    orders.create_table()
    print("Created all databases")
