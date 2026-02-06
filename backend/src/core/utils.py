import random


def generate_order_id():
    return "ORD-" + hex(random.randint(0, 0xFFFFFFFF))[2:10].upper()
