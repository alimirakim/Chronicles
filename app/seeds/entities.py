from app.models import db, Entity, Meter, BearerAsset, EntityMeter


def seed_entities():
    """Seed assets needed for Demo Tale."""
    
    # assets
    asset1 = Entity(
        chronicle_id=1,
        subtype="item")
        title="Red Key",
        description="A tiny red key found in the blue room. It probably unlocks red doors, because why not?",
        color="#e05265ff",
        image="key",
        is_unique=True,
    asset2 = Entity(
        chronicle_id=1,
        subtype="item")
        title="Candy",
        description="Colorful pieces of candy wrapped in crinkly celophane. They look delicious.",
        color="#964a70ff",
        image="candy-cane",
    asset3 = Entity(
        chronicle_id=1,
        subtype="deed",)
        title="Took Candy",
        color="#964a70ff",
        description="A candy has been taken.",
        image="hand-sparkles",
    asset4 = Entity(
        chronicle_id=1,
        subtype="item",
        title="Ball",
        description="A ball from the Sweet Fairy.",
        color="#8cb15eff",
        image="baseball-ball",
        is_unique=True,
        )
    asset5 = Entity(
        chronicle_id=1,
        subtype="currency",
        title="Gold",
        description="The currency of the world of Demolandia."
        color="#f0bc62ff",
        image="coins",
    )

    # places
    place1 = Entity(
        chronicle_id=1,
        type="place",
        title="The Beginning",
        description="There is a red door on the left and a blue door on the right",
        image="dungeon",
        is_unique=True)
    place2 = Entity(
        chronicle_id=1,
        type="place",
        title="The Red Room",
        description="The room is very red, and there is another red door on the far wall. There is a table with a vase of flowers and a pile of candy.",
        color="#e05265ff",
        image="door-closed",
        is_unique=True)
    place3 = Entity(
        chronicle_id=1,
        type="place",
        title="The Blue Room",
        description="The room is very blue, and there is another blue door on the far wall. There is a table with a red key on it.",
        color="#5a70ccff",
        image="door-open",
        is_unique=True)
    place4 = Entity(
        chronicle_id=1,
        type="place",
        title="The Joined Room",
        description="Looking back, there is a red and blue door. An angry fairy is in the corner of the room.",
        color="#4f4686ff",
        image="door-open",
        is_unique=True)

    # characters
    character1 = Entity(
        chronicle_id=1,
        type="character",
        subtype="fairy",
        title="Sweet Fairy",
        description="A young fairy with a sweet tooth",
        color="#885c58ff",
        image="user-circle",
        is_unique=True)
    
    # conditions
    condition1 = Entity(
        chronicle_id=1,
        type="condition",
        subtype="mood",
        title="Angry",
        description="An angry mood",
        color="#e05265ff",
        image="angry",
        )
    condition2 = Entity(
        chronicle_id=1,
        type="condition",
        subtype="mood",
        title="Happy",
        description="A happy mood",
        color="#f0bc62ff",
        image="grin",
        )
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
        title="Popularity",
        description="This indicates how well people like you.",
        color="#f0bc62ff",
        image="users",
        min=0,
        max=10,
        base=100,
        mode=10,
    )
    meter2 = Meter(
        chronicle_id=1,
        type="bond",
        title="Perception",
        description="How sharp is your senses? Can you notice when something seems off around you?",
        color="#1b9d8eff",
        image="eye",
        min=0,
        max=20,
        base=10,
        mod=1,
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
