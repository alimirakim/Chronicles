from app.models import db, Chronicle


def seed_chronicles():
    """Seed a chronicle for Demo user."""
    chronicle = Chronicle(
        user_id=1,
        name="Demo Chronicle",
        description="A demonstration of the Iris Isle tale-spinner.")
    db.session.add(chronicle)
    db.session.commit()
    
def undo_chronicles():
    db.session.execute('TRUNCATE chronicles CASCADE;')
    db.session.commit()