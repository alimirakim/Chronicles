from .db import db


class Chronicle(db.Model):
    """Represents a shared universe of content and threads."""
    __tablename__ = "chronicles"
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
    name = db.Column(db.String(50), nullable=False)
    description = db.Column(db.String)
    
    user = db.relationship("User", back_populates="chronicles")
    tales = db.relationship("Tale", back_populates="chronicle")
    assets = db.relationship("Asset", back_populates="chronicle")
    places = db.relationship("Place", back_populates="chronicle")
    characters = db.relationship("Character", back_populates="chronicle")
    
    def to_dict(self):
        """Convert to jsonifyable dictionary."""
        return {
            "id": self.id,
            "user_id": self.user_id,
            "name": self.name,
            "description": self.description,
            "tale_ids": [tale.id for tale in self.tales],
            "character_ids": [character.id for character in self.characters],
            "place_ids": [place.id for place in self.places],
        }
      




# Tag
# Rank
# Status