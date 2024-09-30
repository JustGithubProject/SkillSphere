import httpx


BACKEND_BASE_URL = "http://127.0.0.1:8000"


def test_fetch_all_courses_no_auth():
    with httpx.Client() as client:
        response = client.get(f"{BACKEND_BASE_URL}/api/v1/all/no-auth")
        data = response.json()
        assert 200 <= response.status_code < 300
        assert isinstance(data, list)
    