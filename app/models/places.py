from .db import db


class Place(db.Model):
    """A place that Characters, Assets, and Threads can be located at."""
    __tablename__ = "places"
    id = db.Column(db.Integer, primary_key=True)
    entity_id = db.Column(db.Integer, db.ForeignKey("entities.id"), nullable=False)

    entity = db.relationship("Entity", back_populates="place")

    def to_dict(self):
        """Convert to jsonifyable dictionary."""
        return {
            "id": self.id,
            "title": self.entity.title,
            "description": self.entity.description,
            # "color": self.entity.color,
            # "image": self.entity.image,
        }
