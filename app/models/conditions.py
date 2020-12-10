from .db import db


class Condition(db.Model):
    """
    A temporary, usually time-constrained condition that can inflict an entity.
    """
    __tablename__ = "conditions"
    id = db.Column(db.Integer, primary_key=True)
    chronicle_id = db.Column(db.Integer, db.ForeignKey("chronicles.id"), nullable=False)
    title = db.Column(db.String(50), nullable=False)
    description = db.Column(db.String)
    color = db.Column(db.String(50), default="gray")
    image = db.Column(db.String(250), default="default_condition")
    
    chronicle = db.relationship("Chronicle", back_populates="conditions")
    entity_conditions = db.relationship("EntityCondition", back_populates="condition")
    
    def to_dict(self):
        """Convert to jsonifyable dictionary."""
        return {
            "id": self.id,
            "chronicle_id": self.chronicle_id,
            "title": self.title,
            "description": self.description,
            "color": self.color,
            "image": self.image,
        }