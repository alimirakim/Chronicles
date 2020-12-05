from app.models import db, ThreadChoice


def seed_thread_choices():
    """Seed the connections between threads for Demo Tale."""
    choices = (
      (1, 2), (1, 3),
      (2, 5), (2, 6), (2, 7), (2, 13),
      (3, 8), (3, 9), (3, 14),
      (7, 4), (8, 4),
      (4, 10), (4, 15), (4, 16),
      (10, 11), (10, 12))
    for choice in choices:
        new_choice = ThreadChoice(
            current_thread_id=choice[0],
            choice_thread_id=choice[1])
        db.session.add(new_choice)
    db.session.commit()
    
    
def undo_thread_choices():
    db.session.execute('TRUNCATE thread_choices RESTART IDENTITY CASCADE;')
    db.session.commit()