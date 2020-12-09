from .db import db
from pprint import pprint

        
class Thread(db.Model):
    """One scene that can connect sequentially to other Threads."""
    __tablename__ = "threads"
    id = db.Column(db.Integer, primary_key=True)
    tale_id = db.Column(db.Integer, db.ForeignKey("tales.id", ondelete="cascade"), nullable=False)
    title = db.Column(db.String(250), nullable=False)
    description = db.Column(db.String)
    x = db.Column(db.Integer, nullable=False, default=0)
    y = db.Column(db.Integer, nullable=False, default=0)
    color = db.Column(db.String(50), default="gray")
    image = db.Column(db.String(250), default="default_thread")
    
    tale = db.relationship("Tale", back_populates="threads")
    effects = db.relationship("Effect", 
        back_populates="thread", 
        cascade="all, delete", 
        passive_deletes=True)
    choices = db.relationship("ThreadChoice", 
        foreign_keys="ThreadChoice.current_thread_id", 
        back_populates="choice_thread", 
        cascade="all, delete",
        passive_deletes=True)
    
    # TODO Convert thread choices into a through table
    # choices = db.relationship("Thread", "thread_choices",
    #     primaryjoin=Thread.id == thread_choices.c.current_thread_id,
    #     secondaryjoin=Thread.id == thread_choices.c.choice_thread_id,
    #     backref="parent_thread",
    #     cascade="all, delete"
    #     passive_deletes=True
    #     )
    
    # def choice_to_dict():
    #     """Convert thread to dictionary, including only information for choice."""
    #     return {
    #         "id": self.id,
    #     }

    def to_dict(self):
        """Convert to dictionary."""
        print("\n\nTHREAD DICTIONARY")
        return {
            "id": self.id,
            "tale_id": self.tale_id,
            "title": self.title,
            "description": self.description,
            "effects": [effect.to_dict() for effect in self.effects],
            "choices": [choice.to_dict() for choice in self.choices],
            "x": self.x,
            "y": self.y,
            "color": self.color,
            "image": self.image,
        }
