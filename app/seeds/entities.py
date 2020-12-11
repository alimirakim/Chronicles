from app.models import db, Entity, Meter, BearerAsset, EntityMeter


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
    asset4 = Entity(
        chronicle_id=1,
        title="Ball",
        description="A ball from the Sweet Fairy.",
        subtype="item",)

    # places
    place1 = Entity(
        chronicle_id=1,
        title="The Beginning",
        description="There is a red door on the left and a blue door on the right",
        type="place",
        is_unique=True)
    place2 = Entity(
        chronicle_id=1,
        title="The Red Room",
        description="The room is very red, and there is another red door on the far wall. There is a table with a vase of flowers and a pile of candy.",
        type="place",
        is_unique=True)
    place3 = Entity(
        chronicle_id=1,
        title="The Blue Room",
        description="The room is very blue, and there is another blue door on the far wall. There is a table with a red key on it.",
        type="place",
        is_unique=True)
    place4 = Entity(
        chronicle_id=1,
        title="The Joined Room",
        description="Looking back, there is a red and blue door. An angry fairy is in the corner of the room.",
        type="place",
        is_unique=True)

    # characters
    character1 = Entity(
        chronicle_id=1,
        title="Sweet Fairy",
        description="A young fairy with a sweet tooth",
        type="character",
        subtype="fairy",
        is_unique=True)
    
    # conditions
    condition1 = Entity(
        chronicle_id=1,
        title="Angry",
        description="An angry mood",
        type="condition",
        subtype="mood",)
    condition2 = Entity(
        chronicle_id=1,
        title="Happy",
        description="A happy mood",
        type="condition",
        subtype="mood",)
    # TODO Figure out how to add assets/etc. to entities via join table 

    ba1 = BearerAsset(
        bearer=character1,
        asset=asset4,
      )
    ba2 = BearerAsset(
        bearer=character1,
        asset=condition1,
    )
    
    meter1 = Meter(
        chronicle_id=1,
        type="bond",
        title="Affection",
        description="This indicates how well someone likes you.",
        color="pink",
        image="heart",
        min=0,
        max=1,
        base=100,
    )
    meter2 = Meter(
        chronicle_id=1,
        type="bond",
        title="Perception",
        description="How sharp is your senses? Can you notice when something seems off around you?",
        color="yellow",
        image="heart",
        min=0,
        max=20,
        base=5,
    )
    
    em1 = EntityMeter(
      entity=character1,
      meter=meter1,
      progress=50,
    )

    db.session.add(asset1)
    db.session.add(asset2)
    db.session.add(asset3)
    db.session.add(asset4)
    db.session.add(place1)
    db.session.add(place2)
    db.session.add(place3)
    db.session.add(place4)
    db.session.add(character1)
    db.session.add(condition1)
    db.session.add(condition2)
    db.session.add(ba1)
    db.session.add(ba2)
    db.session.add(meter1)
    db.session.add(meter2)
    db.session.add(em1)
    db.session.commit()
    
    
def undo_entities():
    db.session.execute('TRUNCATE entities RESTART IDENTITY CASCADE;')
    db.session.commit()
