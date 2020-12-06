from .db import db


class Entity(db.Model):
    """
    An entity representing a person, creature, place, thing, or idea that can
    have and maintain state, such as inventory, conditions, ranks, etc.
    """
    __tablename__ = "entities"
    id = db.Column(db.Integer, primary_key=True)
    chronicle_id = db.Column(db.Integer, db.ForeignKey("chronicles.id"), nullable=False)
    type = db.Column(db.String(50), nullable=False, default="asset") # (db.Enum("asset", "character", "place"))
    name = db.Column(db.String(50), nullable=False)
    description = db.Column(db.String)
    color = db.Column(db.String(50), default="gray")
    image = db.Column(db.String(250), default="default_asset")
    
    chronicle = db.relationship("Chronicle", back_populates="entities")
    asset = db.relationship("Asset", back_populates="entity")
    character = db.relationship("Character", back_populates="entity")
    place = db.relationship("Place", back_populates="entity")
    entity_assets = db.relationship("EntityAsset", back_populates="entity")
    entity_conditions = db.relationship("EntityCondition", back_populates="entity")
    entity_ranks = db.relationship("EntityRank", back_populates="entity")
    
    def to_dict(self):
        """Convert to dictionary."""
        return {
            "id": self.id,
            "chronicle_id": self.chronicle_id,
            "type": self.type,
            "name": self.name,
            "description": self.description,
            "color": self.color,
            "image": self.image,
            "assets": [e_a.to_dict() for e_a in self.entity_assets],
            "conditions": [e_c.to_dict() for e_c in self.entity_conditions],
            "ranks": [e_r.to_dict() for e_r in self.entity_ranks],
        }
