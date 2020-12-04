from .db import db


class Character(db.Model):
    """
    An entity that can take actions, be engaged with, and have Assets, state,
    and things.
    """
    __tablename__ = "characters"
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
    chronicle_id = db.Column(db.Integer, db.ForeignKey("chronicles.id"), nullable=False)
    name = db.Column(db.String(50), nullable=False)
    description = db.Column(db.String)
    
    user = db.relationship("User", back_populates="characters")
    chronicle = db.relationship("Chronicle", back_populates="characters")
    # assets = db.relationship("Asset", back_populates="characters")
    # ranks = db.relationship("Rank", back_populates="characters")
    # statuses = db.relationship("Status", back_populates="characters")
    # attire = db.relationships("Asset", back_populates="character_attire")

    def to_dict(self):
        """Convert to jsonifyable dictionary."""
        return {
            "id": self.id,
            "user_id": self.user_id,
            "chronicle_id": self.chronicle_id,
            "name": self.name,
            "description": self.description,
            "asset_ids": [asset.id for asset in self.assets]
        }

class CharacterAssets(db.Model):
    """The Assets posessed by a Character."""
    __tablename__ = "character_assets"
    id = db.Column(db.Integer, primary_key=True)
    character_id = db.Column(db.Integer, db.ForeignKey("characters.id"), nullable=False)
    asset_id = db.Column(db.Integer, db.ForeignKey("assets.id"), nullable=False)
    quantity = db.Column(db.Integer, nullable=False, default=1)
    
    character = db.relationship("Character")
    asset = db.relationship("Asset")