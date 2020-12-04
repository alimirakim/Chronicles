from app.models import db, Asset


def seed_assets():
    """Seed assets needed for Demo Tale."""
    asset1 = Asset(
        name="Red Key",
        description="A tiny red key found in the blue room. It probably unlocks red doors, because why not?",
        type="item")
    asset2 = Asset(
        name="Candy",
        description="Colorful pieces of candy wrapped in crinkly celophane. They look delicious.",
        type="item")
    db.session.add(asset1, asset2)
    db.session.commit()
    
    
def undo_assets():
    db.session.execute('TRUNCATE assets CASCADE;')
    db.session.commit()
