from .db import db
from datetime import datetime


class Tale(db.Model):
    """A chronologically connected series of threads"""
    __tablename__ = "tales"
    id = db.Column(db.Integer, primary_key=True)
    chronicle_id = db.Column(db.Integer, db.ForeignKey("chronicles.id", ondelete="cascade"), nullable=False)
    title = db.Column(db.String(50), nullable=False)
    description = db.Column(db.String)
    first_thread_id = db.Column(db.Integer)
    color = db.Column(db.String(50), default="rgb(70,60,70)")
    image = db.Column(db.String(250), default="scroll")
    created_at = db.Column(db.DateTime, nullable=False, default=datetime.now())
    
    chronicle = db.relationship("Chronicle", back_populates="tales")
    threads = db.relationship("Thread", back_populates="tale", cascade="all, delete", passive_deletes=True)
    

    def to_dict(self):
        """Convert to jsonifyable dictionary."""
        return {
            "id": self.id,
            "chronicle_id": self.chronicle_id,
            "title": self.title,
            "description": self.description,
            "first_thread_id": self.first_thread_id,
            "thread_ids": [thread.id for thread in self.threads],
            "color": self.color,
            "image": self.image,
            "created_at": self.created_at,
        }
