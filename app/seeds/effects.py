from app.models import db, Effect, AssetEffect


def seed_effects():
    """Seet the effects bestowed by reaching threads in Demo Tale."""
    effect1 = Effect(thread_id=5)
    asseteffect1 = AssetEffect(
      effect=effect1,
      asset_id=2,
      quantity=1,)
    effect2 = Effect(thread_id=9)
    asseteffect2 = AssetEffect(
      effect=effect2,
      asset_id=1,
      quantity=5,)
    db.session.add(effect1, effect2, asseteffect1, asseteffect2)
    db.session.commmit()
    
    
def undo_effects():
    db.session.execute('TRUNCATE asset_effects CASCADE;')
    db.session.commit()
    db.session.execute('TRUNCATE effects CASCADE;')
    db.session.commit()