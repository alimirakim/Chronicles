from app.models import db, Lock, AssetLock


def seed_locks():
    """Seed the lock requirements for threads in Demo Tale."""
    
    # Requires Red Key to enter Red Room, does not consume
    lock1 = Lock(choice_id=1)
    assetlock1 = AssetLock(
        lock=lock1,
        asset_id=1,
        type="proof")

    # Requires at least one Candy to give to Sweet Fairy
    lock2 = Lock(choice_id=7)
    assetlock2 = AssetLock(
      lock=lock2,
      asset_id=2,
      quantity=1,
      type="price")

    # Disallows taking more than five Candies
    lock2b = Lock(choice_id=3)
    assetlock2b = AssetLock(
        lock=lock2b,
        asset_id=3,
        quantity=5,
        type="prohibited",) # price, proof, prohibited


    db.session.add(lock1)
    db.session.add(assetlock1)
    db.session.add(lock2)
    db.session.add(assetlock2)
    db.session.add(lock2b)
    db.session.add(assetlock2b)
    db.session.commit()
    
    
def undo_locks():
    db.session.execute('TRUNCATE asset_locks RESTART IDENTITY CASCADE;')
    db.session.commit()
    db.session.execute('TRUNCATE locks RESTART IDENTITY CASCADE;')
    db.session.commit()
