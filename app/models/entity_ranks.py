from .db import db


class EntityRank(db.Model):
    """A quantifiable rank possessed by an entity as a part of their state."""
    __tablename__ = "entity_ranks"
    id = db.Column(db.Integer, primary_key=True)
    entity_id = db.Column(db.Integer, db.ForeignKey("entities.id"), nullable=False)
    rank_id = db.Column(db.Integer, db.ForeignKey("ranks.id"), nullable=False)
    progress = db.Column(db.Integer, nullable=False, default=0)
    
    entity = db.relationship("Entity", back_populates="entity_ranks")
    rank = db.relationship("Rank", back_populates="entity_ranks")
    
    def to_dict(self):
        """Convert to dictionary."""
        return {
            "id": self.id,
            "rank_id": self.rank_id,
            "progress": self.progress,
        }