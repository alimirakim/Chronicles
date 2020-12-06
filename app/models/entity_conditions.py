from .db import db
from datetime import datetime, timedelta


class EntityCondition(db.Model):
    """A condition inflicted on an entity as a part of their state."""
    __tablename__ = "entity_conditions"
    id = db.Column(db.Integer, primary_key=True)
    entity_id = db.Column(db.Integer, db.ForeignKey("entities.id"), nullable=False)
    condition_id = db.Column(db.Integer, db.ForeignKey("conditions.id"), nullable=False)
    expiry = db.Column(db.DateTime, nullable=False, default=datetime.now()+timedelta(hours=1, minutes=0, seconds=0))
    
    entity = db.relationship("Entity", back_populates="entity_conditions")
    condition = db.relationship("Condition", back_populates="entity_conditions")
    
    def to_dict(self):
        """Convert to dictionary."""
        return {
            "id": self.id,
            "condition_id": self.condition_id,
            "expiry": self.expiry,
        }
