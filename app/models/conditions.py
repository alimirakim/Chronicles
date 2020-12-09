from .db import db


class Condition(db.Model):
    """
    A temporary, usually time-constrained condition that can inflict an entity.
    """
    __tablename__ = "conditions"
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(50), nullable=False)
    description = db.Column(db.String)
    color = db.Column(db.String(50), default="gray")
    image = db.Column(db.String(250), default="default_condition")
    
    entity_conditions = db.relationship("EntityCondition", back_populates="condition")
    
    def to_dict(self):
        """Convert to jsonifyable dictionary."""
        return {
            "id": self.id,
            "title": self.title,
            "description": self.description,
            "color": self.color,
            "image": self.image,
        }