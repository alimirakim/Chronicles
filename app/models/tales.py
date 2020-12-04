from .db import db


class Tale(db.Model):
    """A chronologically connected series of threads"""
    __tablename__ = "tales"
    id = db.Column(db.Integer, primary_key=True)
    chronicle_id = db.Column(db.Integer, db.ForeignKey("chronicles.id"), nullable=False)
    name = db.Column(db.String(50), nullable=False)
    description = db.Column(db.String)
    
    chronicle = db.relationship("Chronicle", back_populates="tales")
    threads = db.relationship("Thread", back_populates="tale")

    def to_dict(self):
        """Convert to jsonifyable dictionary."""
        return {
            "id": self.id,
            "chronicle_id": self.chronicle_id,
            "name": self.name,
            "description": self.description,
            "thread_ids": [thread.id for thread in self.threads],
        }
