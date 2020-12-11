from .db import db


class Meter(db.Model):
    """Represents the meter settings for an entity, such as an ability, skill,
    growth, or knowledge meter."""
    __tablename__ = "meters"
    id = db.Column(db.Integer, primary_key=True)
    entity_id = db.Column(db.Integer, db.ForeignKey("entities.id"), nullable=False)
    min = db.Column(db.Integer, nullable=False, default=0)
    max = db.Column(db.Integer, nullable=False, default=20)
    algorithm = db.Column(db.String, nullable=False, default="constant") # "constant", "log", "linear", "loglinear", "polynomial", "exponential", "factorial"
    base = db.Column(db.Integer, nullable=False, default=1)
    mod = db.Column(db.String, nullable=False, default=1)
  
    entity = db.relationship("Entity", back_populates="meter")
    
    def to_dict(self):
        """Convert to jsonifyable dictionary."""
        return {
            "id": self.id,
            "entity_id": self.entity_id,
            "min": self.min,
            "max": self.max,
            "algorithm": self.algorithm,
            "base": self.base,
            "mod": self.mod,
        }