from .db import db


class Rank(db.Model):
    """Represents a metered state for an entity, such as an ability, skill,
    growth, or knowledge rank."""
    __tablename__ = "ranks"
    id = db.Column(db.Integer, primary_key=True)
    chronicle_id = db.Column(db.Integer, db.ForeignKey("chronicles.id"), nullable=False)
    title = db.Column(db.String(50), nullable=False)
    description = db.Column(db.String)
    # type = db.Column(db.String(50), nullable=False) # rank, status, 
    color = db.Column(db.String(50), default="gray")
    image = db.Column(db.String(250), default="default_rank")
    
    chronicle = db.relationship("Chronicle", back_populates="ranks")
    entity_ranks = db.relationship("EntityRank", back_populates="rank")
    
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
