from .db import db
from datetime import datetime


class Entity(db.Model):
    """
    An entity representing a person, creature, place, thing, or idea that can
    have and maintain state, such as inventory, conditions, meters, etc.
    """
    __tablename__ = "entities"
    id = db.Column(db.Integer, primary_key=True)
    chronicle_id = db.Column(db.Integer, db.ForeignKey("chronicles.id"), nullable=False)
    type = db.Column(db.String(50), nullable=False, default="asset") # (db.Enum("asset", "character", "place", "condition", "rank"))
    subtype = db.Column(db.String(50)) # (db.Enum("item", "bond", "deed", "idea", "title", "human", "skill", "knowledge", "fancy schmancy"))
    title = db.Column(db.String(50), nullable=False)
    description = db.Column(db.String)
    color = db.Column(db.String(50), default="gray")
    image = db.Column(db.String(250), default="default_asset")
    is_unique = db.Column(db.Boolean, nullable=False, default=False)
    created_at = db.Column(db.DateTime, nullable=False, default=datetime.now())
    
    chronicle = db.relationship("Chronicle", back_populates="entities")
    meter = db.relationship("Meter", back_populates="entity")
    bearer = db.relationship("BearerAsset", back_populates="asset")
    assets = db.relationship("BearerAsset", back_populates="bearer")
    asset_locks = db.relationship("AssetLock", back_populates="asset")
    asset_effects = db.relationship("AssetEffect", back_populates="asset")
    
    def to_dict(self):
        """Convert to dictionary."""
        return {
            "id": self.id,
            "chronicle_id": self.chronicle_id,
            "type": self.type,
            "subtype": self.subtype,
            "title": self.title,
            "description": self.description,
            "color": self.color,
            "image": self.image,
            "meter": self.meter,
            "assets": [asset.to_dict() for asset in self.assets],
            "is_unique": self.is_unique,
            "created_at": self.created_at,
        }


# NOTE this is a fancy JOIN! Represents: items, conditions, ranks, bonds, deeds, titles, ideas,
class BearerAsset(db.Model):
    """Represents something that an individual entity has."""
    __tablename__ = "bearer_assets"
    id = db.Column(db.Integer, primary_key=True)
    bearer_id = db.Column(db.Integer, db.ForeignKey("entities.id"), nullable=False)
    asset_id = db.Column(db.Integer, db.ForeignKey("entities.id"), nullable=False)
    total = db.Column(db.Integer, nullable=False, default=1)
    meter_points = db.Column(db.Integer)
    created_at = db.Column(db.DateTime, nullable=False, default=datetime.now())
    
    bearer = db.relationship("Entity", back_populates="assets")
    asset = db.relationship("Entity", back_populates="bearer")
    
    def to_dict():
        """Returns a dictionary of an entity's asset"""
        return {
            "bearer_id": self.bearer_id,
            "asset_id": self.asset_id,
            "total": self.total,
            "meter_points": self.meter_points,
            "created_at": self.created_at,
        }


# class Modifier(db.Model):
#     """
#     Modifier for an entity, like an equippable item or condition, on another
#     metered entity, like a skill or size rating.
#     """
#     __tablename__ = "modifiers"
#     id = db.Column(db.Integer, primary_key=True)
#     modifier_entity_id = db.Column(db.Integer, db.ForeignKey("entities.id"), nullable=False)
#     modified_entity_id = db.Column(db.Integer, db.ForeignKey("entities.id"), nullable=False)
#     mod = db.Column(db.Integer, nullable=False, default=1)


# Join table for a player's playable characters
player_characters = db.Table(
    "player_characters",
    db.Model.metadata,
    db.Column("player_id", db.Integer, db.ForeignKey("users.id"), primary_key=True)
    db.Column("character_id", db.Integer, db.ForeignKey("characters.id"), primary_key=True)
    )