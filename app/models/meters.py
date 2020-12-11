from .db import db
from datetime import datetime

class Meter(db.Model):
    """Represents the meter settings for an entity, such as an ability, skill,
    growth, or knowledge meter."""
    __tablename__ = "meters"
    id = db.Column(db.Integer, primary_key=True)
    chronicle_id = db.Column(db.Integer, db.ForeignKey("chronicles.id"), nullable=False)
    type = db.Column(db.String(50)) # (db.Enum("skill", "knowledge", "ability", "level"))
    title = db.Column(db.String(50), nullable=False)
    description = db.Column(db.String)
    color = db.Column(db.String(50), default="gray")
    image = db.Column(db.String(250), default="default_asset")
    min = db.Column(db.Integer, nullable=False, default=0)
    max = db.Column(db.Integer, nullable=False, default=20)
    algorithm = db.Column(db.String, nullable=False, default="constant") # "constant", "log", "linear", "loglinear", "polynomial", "exponential", "factorial", "random"
    base = db.Column(db.Integer, nullable=False, default=1) 
    mod = db.Column(db.String, nullable=False, default=1) # Can be negative
    created_at = db.Column(db.DateTime, nullable=False, default=datetime.now())
  
    chronicle = db.relationship("Chronicle", back_populates="meters")
    
    def to_dict(self):
        """Convert to jsonifyable dictionary."""
        return {
            "id": self.id,
            "chronicle_id": self.chronicle_id,
            "type": self.type,
            "title": self.title,
            "description": self.description,
            "color": self.color,
            "image": self.image,
            "min": self.min,
            "max": self.max,
            "algorithm": self.algorithm,
            "base": self.base,
            "mod": self.mod,
            "created_at": self.created_at,
        }