from .db import db


class Chronicle(db.Model):
    """Represents a shared universe of content and threads."""
    __tablename__ = "chronicles"
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
    title = db.Column(db.String(50), nullable=False)
    description = db.Column(db.String)
    color = db.Column(db.String(50), default="gray")
    image = db.Column(db.String(250), default="default_chronicle")
    
    user = db.relationship("User", back_populates="chronicles")
    entities = db.relationship("Entity", back_populates="chronicle")
    tales = db.relationship("Tale", back_populates="chronicle")
    
    def to_dict(self):
        """Convert to jsonifyable dictionary."""
        return {
            "id": self.id,
            "user_id": self.user_id,
            "title": self.title,
            "description": self.description,
            "tale_ids": [tale.id for tale in self.tales],
            "character_eids": [entity.id for entity in self.entities if entity.type == "character"],
            "place_eids": [entity.id for entity in self.entities if entity.type == "place"],
            "asset_eids": [entity.id for entity in self.entities if entity.type == "asset"],
            "color": self.color,
            "image": self.image,
        }
      




# Tag
# Rank
# Status