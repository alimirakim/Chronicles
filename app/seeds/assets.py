from app.models import db, Entity, Asset


def seed_assets():
    """Seed assets needed for Demo Tale."""
    
    asset1 = Entity(
        chronicle_id=1,
        name="Red Key",
        description="A tiny red key found in the blue room. It probably unlocks red doors, because why not?",
        color="red")
    asset1b = Asset(entity=asset1, is_unique=True)
    
    asset2 = Entity(
        chronicle_id=1,
        name="Candy",
        description="Colorful pieces of candy wrapped in crinkly celophane. They look delicious.",
        color="pink")
    asset2b = Asset(entity=asset2)
    
    asset3 = Entity(
        chronicle_id=1,
        name="Took Candy",
        description="A candy has been taken.")
    asset3b = Asset(entity=asset3, type="state")

    db.session.add(asset1)
    db.session.add(asset1b)
    db.session.add(asset2)
    db.session.add(asset2b)
    db.session.add(asset3)
    db.session.add(asset3b)
    db.session.commit()
    
    
def undo_assets():
    db.session.execute('TRUNCATE assets RESTART IDENTITY CASCADE;')
    db.session.commit()
