from app.models import db, Lock, AssetLock


def seed_locks():
    """Seed the lock requirements for threads in Demo Tale."""
    lock1 = Lock(thread_id=2)
    assetlock1 = AssetLock(
        lock=lock1,
        asset_id=1)
    lock2 = Lock(thread_id=11)
    assetlock2 = AssetLock(
      lock=lock2,
      asset_id=2)
    db.session.add(lock1)
    db.session.add(assetlock1)
    db.session.add(lock2)
    db.session.add(assetlock2)
    db.session.commit()
    
    
def undo_locks():
    db.session.execute('TRUNCATE asset_locks RESTART IDENTITY CASCADE;')
    db.session.commit()
    db.session.execute('TRUNCATE locks RESTART IDENTITY CASCADE;')
    db.session.commit()
