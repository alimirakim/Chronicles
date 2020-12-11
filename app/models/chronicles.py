from .db import db
from datetime import datetime


class Chronicle(db.Model):
    """Represents a shared universe of content and threads."""
    __tablename__ = "chronicles"
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
    title = db.Column(db.String(50), nullable=False)
    description = db.Column(db.String)
    color = db.Column(db.String(50), default="gray")
    image = db.Column(db.String(250), default="default_chronicle")
    created_at = db.Column(db.DateTime, nullable=False, default=datetime.now())
    
    user = db.relationship("User", back_populates="chronicles")
    entities = db.relationship("Entity", back_populates="chronicle", cascade="all,delete", passive_deletes=True)
    tales = db.relationship("Tale", back_populates="chronicle", cascade="all,delete", passive_deletes=True)
    
    def to_dict(self):
        """Convert to jsonifyable dictionary."""
        return {
            "id": self.id,
            "user_id": self.user_id,
            "creator": self.user.username,
            "title": self.title,
            "description": self.description,
            "tale_ids": [tale.id for tale in self.tales],
            "character_eids": [entity.id for entity in self.entities if entity.type == "character"],
            "place_eids": [entity.id for entity in self.entities if entity.type == "place"],
            "asset_eids": [entity.id for entity in self.entities if entity.type == "asset"],
            "condition_eids": [cond.id for cond in self.entities if entity.type == "condition"],
            "color": self.color,
            "image": self.image,
            "created_at": self.created_at,
        }
      




# Tag
# Meter
# Status