from .db import db


class Place(db.Model):
    """A place that Characters, Assets, and Threads can be located at."""
    __tablename__ = "places"
    id = db.Column(db.Integer, primary_key=True)
    chronicle_id = db.Column(db.Integer, db.ForeignKey("chronicles.id"))
    name = db.Column(db.String(50), nullable=False)
    description = db.Column(db.String)
    
    chronicle = db.relationship("Chronicle", back_populates="places")
    # assets = db.relationship("Asset", back_populates="places")

    def to_dict(self):
        """Convert to jsonifyable dictionary."""
        return {
            "id": self.id,
            "chronicle_id": self.chronicle_id,
            "name": self.name,
            "description": self.description,
            "asset_ids": [asset.id for asset in self.assets]
        }
