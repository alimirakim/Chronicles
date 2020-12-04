from app.models import db, Lock, AssetLock


def seed_locks():
    """Seed the lock requirements for threads in Demo Tale."""
    lock1 = Lock(
        type="asset",
        thread_id=2)
    assetlock1 = AssetLock(
        lock=lock1,
        asset_id=1)
    lock2 = Lock(
      type="asset",
      thread_id=11)
    assetlock2 = AssetLock(
      lock=lock2,
      asset_id=2)
    db.session.add(lock1, assetlock1, lock2, assetlock2)
    db.session.commit()
    
    
def undo_locks():
    db.session.execute('TRUNCATE asset_locks CASCADE;')
    db.session.commit()
    db.session.execute('TRUNCATE locks CASCADE;')
    db.session.commit()
