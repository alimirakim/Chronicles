from .db import db

# location, trial, status, time, attire


class Lock(db.Model):
    """A requirement for access to a thread choice."""
    __tablename__ = "locks"
    id = db.Column(db.Integer, primary_key=True)
    type = db.Column(db.String(50), nullable=False, default="proof") # (db.Enum("asset", "location", "time", "trial", "status", "presentation"), nullable=False, default="proof")
    thread_id = db.Column(db.Integer, db.ForeignKey("threads.id"), nullable=False)
    
    thread = db.relationship("Thread", back_populates="locks")
    asset_lock = db.relationship("AssetLock", back_populates="lock")
    
    def to_dict(self):
        return {
            "id": self.id,
            "type": self.type,
            "thread_id": self.thread_id,
        }
      
      
class AssetLock(db.Model):
    """A type of lock that requires some asset to unlock a Thread."""
    __tablename__ = "asset_locks"
    id = db.Column(db.Integer, primary_key=True)
    lock_id = db.Column(db.Integer, db.ForeignKey("locks.id"), nullable=False)
    asset_id = db.Column(db.Integer, db.ForeignKey("assets.id"), nullable=False)
    quantity = db.Column(db.Integer, nullable=False, default=1)
    is_consumed = db.Column(db.Boolean, nullable=False, default=True)
    
    lock = db.relationship("Lock", back_populates="asset_lock")
    asset = db.relationship("Asset", back_populates="locks")
    
    def to_dict(self):
        return {
            "id": self.id,
            "lock_id": self.lock_id,
            "asset_id": self.asset_id,
            "quantity": self.quantity,
            "is_consumed": self.is_consumed,
            "thread_id": self.lock.thread_id,
        }
