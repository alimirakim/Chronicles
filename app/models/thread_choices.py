from .db import db


class ThreadChoice(db.Model):
    """A join table connecting a thread with a following branch thread."""
    __tablename__ = "thread_choices"
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(250))
    current_thread_id = db.Column(db.Integer, db.ForeignKey("threads.id", ondelete="CASCADE"), nullable=False)
    choice_thread_id = db.Column(db.Integer, db.ForeignKey("threads.id"), nullable=False)
    color = db.Column(db.String(50), default="gray")
    image = db.Column(db.String(250), default="default_choice")
    
    current_thread = db.relationship("Thread", foreign_keys=[current_thread_id])
    choice_thread = db.relationship("Thread", foreign_keys=[choice_thread_id], passive_deletes=True)
    locks = db.relationship("Lock", back_populates="choice")

    def to_dict(self):
        """Convert to dictionary."""
        print("\n\nTHREAD DICTIONARY")
        return {
            "id": self.id,
            "tale_id": self.current_thread.tale_id,
            "title": self.title,
            "current_thread_id": self.current_thread_id,
            "choice_thread_id": self.choice_thread_id,
            "locks": [lock.to_dict() for lock in self.locks],
            "color": self.color,
            "image": self.image,
        }