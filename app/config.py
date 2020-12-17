import os

class Config:
  SECRET_KEY=os.environ.get('SECRET_KEY')
  SQLALCHEMY_TRACK_MODIFICATIONS=False
  SQLALCHEMY_DATABASE_URI=os.environ.get('DATABASE_URL')
  SQLALCHEMY_ECHO=True
  
  
class TestConfig(Config):
    """Configuration for tests"""
    SECRET_KEY=os.environ.get('SECRET_KEY')
    DEBUG = True
    TESTING = True
    # SQLALCHEMY_DATABASE_URI = "postgres://:memory:"
    WTF_CSRF_ENABLED = False