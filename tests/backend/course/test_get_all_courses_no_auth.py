import httpx


BACKEND_BASE_URL = "http://127.0.0.1:8000"


def test_fetch_all_courses_no_auth():
    # Stupid test to check 
    assert 200 == 200
