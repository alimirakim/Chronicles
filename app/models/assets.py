from .db import db


class Asset(db.Model):
    """An obtainable entity representing a thing or idea."""
    __tablename__ = "assets"
    id = db.Column(db.Integer, primary_key=True)
    entity_id = db.Column(db.Integer, db.ForeignKey("entities.id"), nullable=False)
    type = db.Column(db.String(50), nullable=False, default="item") # (db.Enum(item, bond, deed, title, idea))
    is_unique = db.Column(db.Boolean, nullable=False, default=False)
    
    entity = db.relationship("Entity", back_populates="asset")
    effects = db.relationship("AssetEffect", back_populates="asset")
    locks = db.relationship("AssetLock", back_populates="asset")
    entity_assets = db.relationship("EntityAsset", back_populates="asset")

    def to_dict(self):
        """Convert to dictionary."""
        return {
            "id": self.id,
            "chronicle_id": self.entity.chronicle_id,
            "title": self.entity.title,
            "description": self.entity.description,
            # "color": self.entity.color,
            # "image": self.entity.image,
            "type": self.type,
            "is_unique": self.is_unique,
        }