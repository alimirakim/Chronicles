from .db import db


class Rank(db.Model):
    """Represents a metered state for an entity, such as an ability, skill,
    or knowledge rank."""
    __tablename__ = "ranks"
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(50), nullable=False)
    description = db.Column(db.String, nullable=False)
    # type = db.Column(db.String(50), nullable=False) # rank, status, 
    
    def to_dict(self):
        """Convert to jsonifyable dictionary."""
        return {
            "id": self.id,

        }


class CharacterRank(db.Model):
    """Join table assigning the rank and rank level to a character."""
    __tablename__ = "character_ranks"
    id = db.Column(db.Integer, primary_key=True)
    character_id = db.Column(db.Integer, db.ForeignKey("characters.id"), nullable=False)
    rank_id = db.Column(db.Integer, db.ForeignKey("ranks.id"), nullable=False)
    ranking = db.Column(db.Integer, nullable=False, default=1)
    
    def to_dict(self):
        """Convert to jsonifyable dictionary."""
        return {
            "id": self.id,

        }
