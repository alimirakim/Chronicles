from app.models import db, Entity


def seed_entities():
    """Seed assets needed for Demo Tale."""
    
    # assets
    asset1 = Entity(
        chronicle_id=1,
        title="Red Key",
        description="A tiny red key found in the blue room. It probably unlocks red doors, because why not?",
        color="red",
        is_unique=True,
        subtype="item")
    
    asset2 = Entity(
        chronicle_id=1,
        title="Candy",
        description="Colorful pieces of candy wrapped in crinkly celophane. They look delicious.",
        color="pink",
        subtype="item")
    
    asset3 = Entity(
        chronicle_id=1,
        title="Took Candy",
        description="A candy has been taken.",
        subtype="deed",)
        
    # places
    place1 = Entity(
        chronicle_id=1,
        title="The Beginning",
        description="There is a red door on the left and a blue door on the right",
        subtype="",)
    place2 = Entity(
        chronicle_id=1,
        title="The Red Room",
        description="The room is very red, and there is another red door on the far wall. There is a table with a vase of flowers and a pile of candy.",
        )
    place3 = Entity(
        chronicle_id=1,
        title="The Blue Room",
        description="The room is very blue, and there is another blue door on the far wall. There is a table with a red key on it.",
        )

    place4 = Entity(
        chronicle_id=1,
        title="The Joined Room",
        description="Looking back, there is a red and blue door. An angry fairy is in the corner of the room.",
        )

    # characters
    character1 = Entity(
        chronicle_id=1,
        title="Sweet Fairy",
        description="A young fairy with a sweet tooth",
        subtype="fairy",)
        
    # TODO Figure out how to add assets/etc. to entities via join table 

    db.session.add(asset1)
    db.session.add(asset2)
    db.session.add(asset3)
    db.session.add(place1)
    db.session.add(place2)
    db.session.add(place3)
    db.session.add(place4)
    db.session.add(character1)
    db.session.commit()
    
    
def undo_entities():
    db.session.execute('TRUNCATE assets RESTART IDENTITY CASCADE;')
    db.session.commit()
