from .db import db
from datetime import datetime


class Chronicle(db.Model):
    """Represents a shared universe of content and threads."""
    __tablename__ = "chronicles"
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
    title = db.Column(db.String(50), nullable=False)
    description = db.Column(db.String)
    color = db.Column(db.String(50), default="rgb(70,60,70)")
    image = db.Column(db.String(250), default="book")
    created_at = db.Column(db.DateTime, nullable=False, default=datetime.now())
    
    user = db.relationship("User", back_populates="chronicles")
    entities = db.relationship("Entity", back_populates="chronicle", cascade="all,delete", passive_deletes=True)
    tales = db.relationship("Tale", back_populates="chronicle", cascade="all,delete", passive_deletes=True)
    meters = db.relationship("Meter", back_populates="chronicle", cascade="all,delete", passive_deletes=True)
    
    def to_dict(self):
        """Convert to jsonifyable dictionary."""
        return {
            "id": self.id,
            "user_id": self.user_id,
            "creator": self.user.username,
            "title": self.title,
            "description": self.description,
            "color": self.color,
            "image": self.image,
            "tale_ids": [tale.id for tale in self.tales],
            "character_ids": [e.id for e in self.entities if e.type == "character"],
            "place_ids": [e.id for e in self.entities if e.type == "place"],
            "asset_ids": [e.id for e in self.entities if e.type == "asset"],
            "condition_ids": [e.id for e in self.entities if e.type == "condition"],
            "meter_ids": [meter.id for meter in self.meters],
            "created_at": self.created_at,
        }
