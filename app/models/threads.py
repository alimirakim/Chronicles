from .db import db


class Thread(db.Model):
    """One scene that can connect sequentially to other Threads."""
    __tablename__ = "threads"
    id = db.Column(db.Integer, primary_key=True)
    tale_id = db.Column(db.Integer, db.ForeignKey("tales.id"), nullable=False)
    title = db.Column(db.String(50), nullable=False)
    body = db.Column(db.String, nullable=False)
    
    tale = db.relationship("Tale", back_populates="threads")
    locks = db.relationship("Lock", back_populates="thread")
    effects = db.relationship("Effect", back_populates="thread")
    # current_threads = db.relationship("Thread", back_populates="current_thread")
    # choice_threads = db.relationship("Thread", back_populates="choice_thread")

    def to_dict(self):
        """Convert to jsonifyable dictionary."""
        return {
            "id": self.id,
            "tale_id": self.tale_id,
            "name": self.name,
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

    current_thread = db.relationship("Thread", foreign_keys=[current_thread_id])#, back_populates="current_threads")
    choice_thread = db.relationship("Thread", foreign_keys=[choice_thread_id])#, back_populates="choice_threads")

    def to_dict(self):
        """Convert to jsonifyable dictionary."""
        return {
            "id": self.id,

        }
