def mul(a: int, b: int):
    return a * b


def test_mul():
    assert mul(10, 10) == 100
    assert mul(10, 2) == 20
