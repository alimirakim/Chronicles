from .db import db

# location, status


class Effect(db.Model):
    """A change in state to some entity that is applied upon reaching a related Thread."""
    __tablename__ = "effects"
    id = db.Column(db.Integer, primary_key=True)
    type = db.Column(db.String(50), nullable=False, default="asset") # (db.Enum("asset", "location", "status"), nullable=False, default="asset")
    thread_id = db.Column(db.Integer, db.ForeignKey("threads.id"), nullable=False)
    
    thread = db.relationship("Thread", back_populates="effects")
    asset_effect = db.relationship("AssetEffect", back_populates="effect")
    
    def to_dict(self):
        """Convert to jsonifyable dictionary."""
        return {
            "id": self.id,
            "type": self.type,
            "thread_id": self.thread_id
        }


class AssetEffect(db.Model):
    """A type of Effect that bestows or removes Assets from an entity."""
    __tablename__ = "asset_effects"
    id = db.Column(db.Integer, primary_key=True)
    effect_id = db.Column(db.Integer, db.ForeignKey("effects.id"), nullable=False)
    asset_id = db.Column(db.Integer, db.ForeignKey("assets.id"), nullable=False)
    quantity = db.Column(db.Integer, nullable=-False, default=1)
    
    effect = db.relationship("Effect", back_populates="asset_effect")
    asset = db.relationship("Asset", back_populates="effects")

    def to_dict(self):
        """Convert to jsonifyable dictionary."""
        return {
            "id": self.id,
            "effect_id": self.effect_id,
            "asset_id": self.asset_id,
            "quantity": self.quantity,
            "thread_id": self.effect.thread_id,
        }
