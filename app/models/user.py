from .db import db
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin
from datetime import datetime

class User(db.Model, UserMixin):
  __tablename__ = 'users'

  id = db.Column(db.Integer, primary_key = True)
  username = db.Column(db.String(40), nullable = False, unique = True)
  email = db.Column(db.String(255), nullable = False, unique = True)
  hashword = db.Column(db.String(255), nullable = False)
  created_at = db.Column(db.DateTime, nullable=False, default=datetime.now())
  
  chronicles = db.relationship("Chronicle", back_populates="user")
  characters = db.relationship("Entity", secondary="player_characters", backref="player")

  @property
  def password(self):
    return self.hashword


  @password.setter
  def password(self, password):
    self.hashword = generate_password_hash(password)


  def check_password(self, password):
    return check_password_hash(self.password, password)


  def to_dict(self):
      """Convert to jsonifyable dictionary."""
      return {
          "id": self.id,
          "username": self.username,
          "email": self.email
      }
