from .db import db


class Thread(db.Model):
    """One scene that can connect sequentially to other Threads."""
    __tablename__ = "threads"
    id = db.Column(db.Integer, primary_key=True)
    tale_id = db.Column(db.Integer, db.ForeignKey("tales.id"), nullable=False)
    title = db.Column(db.String(250), nullable=False)
    description = db.Column(db.String, nullable=False)
    
    tale = db.relationship("Tale", back_populates="threads")
    locks = db.relationship("Lock", back_populates="thread")
    effects = db.relationship("Effect", back_populates="thread")

    def to_dict(self):
        """Convert to jsonifyable dictionary."""
        return {
            "id": self.id,
            "tale_id": self.tale_id,
            "title": self.title,
            "description": self.description,
            "lock_ids": [lock.id for lock in self.locks],
            "effect_ids": [effect.id for effect in self.effects],
        }


class ThreadChoice(db.Model):
    """A join table connecting a thread with a following branch thread."""
    __tablename__ = "thread_choices"
    id = db.Column(db.Integer, primary_key=True)
    current_thread_id = db.Column(db.Integer, db.ForeignKey("threads.id"), nullable=False)
    choice_thread_id = db.Column(db.Integer, db.ForeignKey("threads.id"), nullable=False)

    current_thread = db.relationship("Thread", foreign_keys=[current_thread_id])
    choice_thread = db.relationship("Thread", foreign_keys=[choice_thread_id])

    def to_dict(self):
        """Convert to jsonifyable dictionary."""
        return {
            "id": self.id,

        }
