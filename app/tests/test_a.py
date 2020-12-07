import os
import tempfile

import pytest

from flaskr import flaskr

@pytest.fixture
def client():
    """Copying Flask's test skeleton example..."""
    db_fd, flaskr.app.config["DATABASE"] = tempfile.mkstemp()
    flaskr.app.config["TESTING"] = True
    
    with flaskr.app.test_client() as client:
        with flaskr.app.app_content():
            flaskr.init_db()
        yield client
    
    os.close(db_fd)
    os.unlink(flaskr.app.config["DATABASE"])
