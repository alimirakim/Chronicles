from .db import db


# character-unique traits? gender, species/race, culture, occupation, schedule, goals/quests, mood, bonds, equipped
class Character(db.Model):
    """
    An entity that can take actions, be engaged with, and have Assets, state,
    and things.
    """
    __tablename__ = "characters"
    id = db.Column(db.Integer, primary_key=True)
    entity_id = db.Column(db.Integer, db.ForeignKey("entities.id"), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
    # place_id = db.Column(db.Integer, db.ForeignKey("places.id"))
    
    entity = db.relationship("Entity", back_populates="character")
    user = db.relationship("User", back_populates="characters")
    # attire = db.relationships("Asset", back_populates="character_attire")

    def to_dict(self):
        """Convert to dictionary."""
        return {
            "id": self.id,
            "user_id": self.user_id,
            "title": self.entity.title,
            "description": self.entity.description,
            # "color": self.entity.color,
            # "image": self.entity.image,
            # "place_id": self.place_id,
        }