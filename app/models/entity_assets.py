from .db import db


class EntityAsset(db.Model):
    """An asset possessed by an entity as a part of their state."""
    __tablename__ = "entity_assets"
    id = db.Column(db.Integer, primary_key=True)
    entity_id = db.Column(db.Integer, db.ForeignKey("entities.id"), nullable=False)
    asset_id = db.Column(db.Integer, db.ForeignKey("assets.id"), nullable=False)
    quantity = db.Column(db.Integer, nullable=False, default=1)
    
    entity = db.relationship("Entity", back_populates="entity_assets")
    asset = db.relationship("Asset", back_populates="entity_assets")
    
    def to_dict(self):
        """Convert to dictionary."""
        return {
            "id": self.id,
            # "entity_id": self.entity_id,
            "asset_id": self.asset_id,
            "quantity": self.quantity,
        }