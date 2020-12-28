from .db import db
from datetime import datetime


class Entity(db.Model):
    """Represents a unique entity."""
    __tablename__ = "entities"
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
    type = db.Column(db.String(50), nullable=False) # character, place, thing, creature
    category = db.Column(db.String(50))
    title = db.Column(db.String(50), nullable=False, default="Untitled")
    description = db.Column(db.String, nullable=False, default="N/A")
    color = db.Column(db.String(50), default="rgb(70,60,70)")
    icon = db.Column(db.String(50), default="id-card")
    image = db.Column(db.String(250), default="")
    created_at = db.Column(db.DateTime, nullable=False, default=datetime.now())
    
    user = db.relationship("User", back_populates="entities")
    location_id = db.Column(db.Integer, db.ForeignKey("entities.id"))
    generated_id = db.Column(db.Integer)
    
    # entity_assets = db.relationship("Asset", secondary="entity_assets", backref="entity")
    # entity_meters = db.relationship("Meter", secondary="entity_meters", backref="entity")
    # entity_statuses = db.relationship("Status", secondary="entity_statuses", backref="entity")
    # entity_slots = db.relationship("Slot", secondary="entity_slots", backref="entity")

    def to_dict(self):
        """Convert to jsonifyable dictionary."""
        return {
            "id": self.id,
            "user_id": self.user_id,
            "type": self.type,
            "category": self.category,
            "title": self.title,
            "description": self.description,
            "color": self.color,
            "icon": self.icon,
            "image": self.image,
            "created_at": self.created_at,

            "location_id": self.location_id,
            "generated_id": self.generated_id,
            
            # "assets": [asset.id for asset in self.entity_assets],
            # "statuses": [status.id for status in self.entity_statuses],
            # "meters": [meter.id for meter in self.entity_meters],
            # "slots": [slot.id for slot in self.entity_slots],
        }


entity_assets = db.Table(
    "entity_assets",
    db.Model.metadata,
    db.Column("entity_id", db.Integer, db.ForeignKey("entities.id"), primary_key=True, nullable=False),
    db.Column("asset_id", db.Integer, db.ForeignKey("assets.id"), primary_key=True, nullable=False),
    db.Column("quantity", db.Integer, nullable=False, default=1)
)


entity_statuses = db.Table(
    "entity_statuses",
    db.Model.metadata,
    db.Column("entity_id", db.Integer, db.ForeignKey("entities.id"), primary_key=True, nullable=False),
    db.Column("status_id", db.Integer, db.ForeignKey("statuses.id"), primary_key=True, nullable=False),
    db.Column("expiry", db.DateTime)
)


entity_meters = db.Table(
    "entity_meters",
    db.Model.metadata,
    db.Column("entity_id", db.Integer, db.ForeignKey("entities.id"), primary_key=True, nullable=False),
    db.Column("meter_id", db.Integer, db.ForeignKey("meters.id"), primary_key=True, nullable=False),
    db.Column("points", db.Integer, nullable=False, default=0)
)


entity_slots = db.Table(
    "entity_slots",
    db.Model.metadata,
    db.Column("entity_id", db.Integer, db.ForeignKey("entities.id"), primary_key=True, nullable=False),
    db.Column("slot_id", db.Integer, db.ForeignKey("slots.id"), primary_key=True, nullable=False),
    db.Column("filler_id", db.Integer, db.ForeignKey("entities.id"))
)