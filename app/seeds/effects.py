from app.models import db, Effect, AssetEffect


def seed_effects():
    """Seed the effects bestowed by reaching threads in Demo Tale."""
    
    # EFFECTS THREAD: Take Candy
    # Adds a candy to player's inventory state
    effect1 = Effect(thread_id=5)
    asseteffect1 = AssetEffect(
      effect=effect1,
      asset_id=2)
    
    # Records that a candy was taken by player
    effect1b = Effect(thread_id=5)
    asseteffect1b = AssetEffect(
      effect=effect1b,
      asset_id=3,
    )
    
    # EFFECTS THREAD: Take Key
    # Adds red key to player's inventory state
    effect2 = Effect(thread_id=7)
    asseteffect2 = AssetEffect(
      effect=effect2,
      asset_id=1)
    
    # Records that the key was taken by the player, to lock thread to once-only.
    effect2b = Effect(thread_id=5)
    asseteffect2b = AssetEffect(
      effect=effect2,
      asset_id=3)
    
    # Changes Sweet Fairy's Mood Condition from Angry to Happy
    # Adds ball to player's inventory state
    # Adds points to affection meter for sweet fairy.
    # Lowers points to affection meter for sweet fairy.
    # Adds points to perception meter for player.

    db.session.add(effect1)
    db.session.add(effect1b)
    db.session.add(effect2)
    db.session.add(effect2b)
    db.session.add(asseteffect1)
    db.session.add(asseteffect1b)
    db.session.add(asseteffect2)
    db.session.add(asseteffect2b)
    db.session.commit()


def undo_effects():
    db.session.execute('TRUNCATE asset_effects RESTART IDENTITY CASCADE;')
    db.session.commit()
    db.session.execute('TRUNCATE effects RESTART IDENTITY CASCADE;')
    db.session.commit()