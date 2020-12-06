from app.models import db, Tale
    
    
def seed_tales():
    """Seed a tale for Demo Chronicle."""
    tale = Tale(
        chronicle_id=1,
        title="Demo Tale",
        description="A demonstration tale.",
        first_thread_id=1,)
    db.session.add(tale)
    db.session.commit()
    
def undo_tales():
    db.session.execute('TRUNCATE tales RESTART IDENTITY CASCADE;')
    db.session.commit()
