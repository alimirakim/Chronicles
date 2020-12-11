from .db import db
from pprint import pprint
from datetime import datetime

# TODO IDEA Non-sequitur threads! Thread is available as a choice anywhere as long 
# as x conditions are met. Can be restricted to once-only, or other number.
# Examples: If character has 'ball' asset and is in a 'room' location type, 
# character can toss ball through window. This causes location's 'clean' rank to
# drop, 'noise' rank to grow.
# Character can always 'look around'. A 'perceptive' trial will decide if
# character can find money by chance. 
# If other character 'lucien' is present and condition "spoke to lucien today" is
# not met, action thread "talk to lucien" is available.
# If location of thread has assets "mushroom", option "pick mushrooms" is available.


class Thread(db.Model):
    """One scene that can connect sequentially to other Threads."""
    __tablename__ = "threads"
    id = db.Column(db.Integer, primary_key=True)
    tale_id = db.Column(db.Integer, db.ForeignKey("tales.id", ondelete="cascade"), nullable=False)
    title = db.Column(db.String(250), nullable=False)
    description = db.Column(db.String)
    color = db.Column(db.String(50), default="gray")
    image = db.Column(db.String(250), default="default_thread")
    x = db.Column(db.Integer, nullable=False, default=0)
    y = db.Column(db.Integer, nullable=False, default=0)
    is_sequitur = db.Column(db.Boolean, nullable=False, default=True)
    is_returnable = db.Column(db.Booolean, nullable=False, default=True)
    created_at = db.Column(db.DateTime, nullable=False, default=datetime.now())
    
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

    def to_dict(self):
        """Convert to dictionary."""
        print("\n\nTHREAD DICTIONARY")
        return {
            "id": self.id,
            "tale_id": self.tale_id,
            "title": self.title,
            "description": self.description,
            "color": self.color,
            "image": self.image,
            "x": self.x,
            "y": self.y,
            "is_sequitur": self.is_sequitur,
            "is_returnable": self.is_returnable,
            "effects": [effect.to_dict() for effect in self.effects],
            "choices": [choice.to_dict() for choice in self.choices],
            "created_at": self.created_at,
        }
    
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
