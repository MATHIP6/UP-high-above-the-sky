from typing import Optional


class PromoCode:
    def __init__(
        self, id: Optional[str], code: str, code_type: str, value: int, enable: bool
    ):
        self.id = id
        self.code = code
        self.type = code_type
        self.value = value
        self.enable = enable
