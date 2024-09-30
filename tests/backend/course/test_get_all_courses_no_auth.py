import pytest

from fastapi.testclient import TestClient

from backend.main import app


client = TestClient(app)

BACKEND_BASE_URL = "127.0.0.1:8000"


def test_fetch_all_courses_no_auth():
    response = client.get(f"{BACKEND_BASE_URL}/api/v1/all/no-auth/")
    data = response.json()
    assert 200 <= response.status_code < 300
    assert isinstance(data, list)
    