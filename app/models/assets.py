from .db import db


class Asset(db.Model):
    """An obtainable entity representing an object or idea."""
    __tablename__ = "assets"
    id = db.Column(db.Integer, primary_key=True)
    chronicle_id = db.Column(db.Integer, db.ForeignKey("chronicles.id"), nullable=False)
    name = db.Column(db.String(50), nullable=False)
    type = db.Column(db.String(50), nullable=False, default="item") # (db.Enum(item, bond, deed, title, idea))
    description = db.Column(db.String)
    
    chronicle = db.relationship("Chronicle", back_populates="assets")
    # characters = db.relationship("Character", back_populates="assets")
    # places = db.relationship("Place", back_populates="assets")
    effects = db.relationship("AssetEffect", back_populates="asset")
    locks = db.relationship("AssetLock", back_populates="asset")

    def to_dict(self):
        """Convert to jsonifyable dictionary."""
        return {
            "id": self.id,
            "chronicle_id": self.chronicle_id,
            "name": self.name,
            "type": self.type,
            "description": self.description,
        }
