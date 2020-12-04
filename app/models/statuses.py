from .db import db


class Status(db.Model):
    """
    A temporary, typically time-constrained status that can inflict an entity.
    """
    __tablename__ = "statuses"
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(50), nullable=False)
    description = db.Column(db.String)
    
    # characters = db.relationship("Character")
    
    def to_dict(self):
        """Convert to jsonifyable dictionary."""
        return {
            "id": self.id,

        }


class CharacterStatus(db.Model):
    """A status currently inflicting a character."""
    __tablename__ = "character_statuses"
    id = db.Column(db.Integer, primary_key=True)
    character_id = db.Column(db.Integer, db.ForeignKey("characters.id"), nullable=False)
    status_id = db.Column(db.Integer, db.ForeignKey("statuses.id"), nullable=False)
    expiry = db.Column(db.DateTime, nullable=False) # TODO Add time-delta-interval-thing for 24 hours.
    
    character = db.relationship("Character")
    status = db.relationship("Status")
    
    def to_dict(self):
        """Convert to jsonifyable dictionary."""
        return {
            "id": self.id,

        }
