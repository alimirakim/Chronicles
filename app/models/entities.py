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
    color = db.Column(db.String(50), default="rgb(70,60,70)")
    image = db.Column(db.String(250), default="id-card")
    is_unique = db.Column(db.Boolean, nullable=False, default=False)
    created_at = db.Column(db.DateTime, nullable=False, default=datetime.now())
    
    chronicle = db.relationship("Chronicle", back_populates="entities")
    # conditions = db.relationship("BearerCondition", back_populates="entity")
    meters = db.relationship("EntityMeter", back_populates="entity")
    assets = db.relationship("BearerAsset", foreign_keys="[BearerAsset.bearer_id]", backref="asset")
    # assets = db.relationship("BearerAsset", foreign_keys="[BearerAsset.asset_id]", backref="bearer")
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
            # "conditions": [condition.to_dict() for condition in self.conditions]
            "meters": [meter.to_dict() for meter in self.meters],
            # "bearer": [bearer.to_dict() for bearer in self.bearer],
            "assets": [asset.to_dict() for asset in self.assets],
            "is_unique": self.is_unique,
            "created_at": self.created_at,
            "player": self.player,
        }


# class BearerCondition(db.Model):
#     """A condition that an entity is afflicted with."""
#     __tablename__ = "bearer_conditions"
#     id = db.Column(db.Integer, primary_key=True)
#     bearer_id = db.Column(db.Integer, db.ForeignKey("entities.id"), nullable=False)
#     condition_id = db.Column(db.Integer, db.ForeignKey("entities.id"), nullable=False)
#     expiry = db.Column(db.DateTime)
#     created_at = db.Column(db.DateTime, nullable=False, default=datetime.now())

#     def to_dict(self):
#         """Returns a dictionary of an entity's asset"""
#         return {
#             "bearer_id": self.bearer_id,
#             "condition_id": self.condition_id,
#             "expiry": self.expiry,
#             "created_at": self.created_at,
#         }
        

# NOTE this is a fancy JOIN! Represents: items, conditions, ranks, bonds, deeds, titles, ideas,
class BearerAsset(db.Model):
    """Represents something that an individual entity has."""
    __tablename__ = "bearer_assets"
    id = db.Column(db.Integer, primary_key=True)
    bearer_id = db.Column(db.Integer, db.ForeignKey("entities.id"), nullable=False)
    asset_id = db.Column(db.Integer, db.ForeignKey("entities.id"), nullable=False)
    quantity = db.Column(db.Integer, nullable=False, default=1)
    created_at = db.Column(db.DateTime, nullable=False, default=datetime.now())

    def to_dict(self):
        """Returns a dictionary of an entity's asset"""
        return {
            "bearer_id": self.bearer_id,
            "asset_id": self.asset_id,
            "quantity": self.quantity,
            "created_at": self.created_at,
        }


class EntityMeter(db.Model): # NOTE Rule against meters for non-unique entities?
    """The meter status associated with an entity."""
    __tablename__ = "entity_meters"
    id = db.Column(db.Integer, primary_key=True)
    entity_id = db.Column(db.Integer, db.ForeignKey("entities.id"), nullable=False)
    meter_id = db.Column(db.Integer, db.ForeignKey("meters.id"), nullable=False)
    progress = db.Column(db.Integer, nullable=False, default=0)
    total = db.Column(db.Integer, nullable=False, default=0)
    created_at = db.Column(db.DateTime, nullable=False, default=datetime.now())
    
    entity = db.relationship("Entity", back_populates="meters")
    meter = db.relationship("Meter")
    
    def to_dict(self):
        """Returns a dictionary of an entity's meter"""
        return {
            "entity_id": self.entity_id,
            "meter_id": self.meter_id,
            "progress": self.progress,
            "total": self.total,
            "created_at": self.created_at,
        }

class Modifier(db.Model):
    """
    Modifier for an entity, like an equippable item or condition, on another
    metered entity, like a skill or size rating.
    """
    __tablename__ = "modifiers"
    id = db.Column(db.Integer, primary_key=True)
    entity_id = db.Column(db.Integer, db.ForeignKey("entities.id"), nullable=False)
    meter_id = db.Column(db.Integer, db.ForeignKey("meters.id"), nullable=False)
    mod = db.Column(db.Integer, nullable=False, default=1)


# Join table for a player's playable characters
player_characters = db.Table(
    "player_characters",
    db.Model.metadata,
    db.Column("player_id", db.Integer, db.ForeignKey("users.id"), primary_key=True),
    db.Column("character_id", db.Integer, db.ForeignKey("entities.id"), primary_key=True),
    )