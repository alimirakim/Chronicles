import os
import tempfile
import pytest
from app import app
from app.config import TestConfig

@pytest.fixture
def client():
    """Create new client for testing."""
    db_fd, app.config['DATABASE'] = tempfile.mkstemp()
    app.config.from_object(TestConfig)

    with app.test_client() as client:
        # with app.app_context():
        #     app.init_db()
        yield client

    os.close(db_fd)
    os.unlink(app.config['DATABASE'])

# def test_empty_db(client):
#     """Start with a blank database."""

#     response = client.get("/")
#     assert b"No entries here so far" in response.data

def login_helper(client, username, password):
    """Logs in user"""
    user = {"username": username, "password": password}
    return client.post("/api/auth/login", data=user, follow_redirects=True)

def logout_helper(client):
    """Logs user out"""
    return client.get("/api/auth/logout", follow_redirects=True)
    

def test_signup(client):
    """Test creating a new user"""
    user = {"username": "snowy", "email": "snow@white.com", "password": "apple"}
    res = client.post("/api/auth/signup", data=user, follow_redirects=True)
    assert b"signup successful" in res.data


def test_login(client):
    """Make sure login works"""
    res = login_helper(client, "demo", "password")
    assert b"login successful" in res.data


def test_logout(client):
    """Make sure logout works"""
    login_helper(client, "demo", "password")
    res = logout_helper(client)
    assert b"logout successful" in res.data


def test_bad_login(client):
    """Make sure invalid username and passwords return error message."""
    res = login_helper(client, "demo FAIL", "password")
    assert b"invalid username" in res.data
    res = login_helper(client, "demo", "password BIG FAIL")
    assert b"invalid password" in res.data


# def test_messages(client):
#     """Test"""
#     data = {"title": "test", "description": "test"}
#     login(client, "demo", "password")
#     res = client.post("/add", data=data, follow_redirects=True)
    # asset b"" not in res.data
    # asset b"" in res.data
    # asset b"" in res.data
