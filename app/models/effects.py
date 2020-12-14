from .db import db
from datetime import datetime


class Effect(db.Model):
    """A change in state to some entity that is applied upon reaching a related Thread."""
    __tablename__ = "effects"
    id = db.Column(db.Integer, primary_key=True)
    type = db.Column(db.String(50), nullable=False, default="asset") # (db.Enum("asset", "location", "status"), nullable=False, default="asset")
    thread_id = db.Column(db.Integer, db.ForeignKey("threads.id", ondelete="cascade"), nullable=False)
    color = db.Column(db.String(50), default="rgb(70,60,70)")
    image = db.Column(db.String(250), default="star")
    created_at = db.Column(db.DateTime, nullable=False, default=datetime.now())
    
    thread = db.relationship("Thread", back_populates="effects")
    asset_effect = db.relationship("AssetEffect", back_populates="effect", cascade="all, delete", passive_deletes=True)
    
    def to_dict(self):
        """Convert to jsonifyable dictionary."""
        return {
            "id": self.id,
            "type": self.type,
            "thread_id": self.thread_id,
            "color": self.color,
            "image": self.image,
            "created_at": self.created_at,
        }


class AssetEffect(db.Model):
    """A type of Effect that bestows or removes Assets from an entity."""
    __tablename__ = "asset_effects"
    id = db.Column(db.Integer, primary_key=True)
    effect_id = db.Column(db.Integer, db.ForeignKey("effects.id", ondelete="cascade"), nullable=False)
    asset_id = db.Column(db.Integer, db.ForeignKey("entities.id", ondelete="cascade"), nullable=False)
    quantity = db.Column(db.Integer, nullable=-False, default=1)
    is_gained = db.Column(db.Boolean, nullable=False, default=True)
    
    effect = db.relationship("Effect", back_populates="asset_effect")
    asset = db.relationship("Entity", back_populates="asset_effects")

    def to_dict(self):
        """Convert to jsonifyable dictionary."""
        return {
            "id": self.id,
            "effect_id": self.effect_id,
            "asset_id": self.asset_id,
            "quantity": self.quantity,
            "thread_id": self.effect.thread_id,
            "is_gained": self.is_gained,
            "created_at": self.created_at,
        }
