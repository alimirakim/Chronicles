from app.models import db, Tale
    
    
def seed_tales():
    """Seed a tale for Demo Chronicle."""
    tale = Tale(
        chronicle_id = 1,
        name = "Demo Tale",
        description = "A demonstration tale.")
    db.session.add(tale)
    db.session.commit()
    
def undo_tales():
    db.session.execute('TRUNCATE tales CASCADE;')
    db.session.commit()
