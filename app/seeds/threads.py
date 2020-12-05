from app.models import db, Thread

def seed_threads():
    """See a series of connected threads for Demo Tale."""
    thread1 = Thread(
        tale_id=1,
        title="The Beginning",
        description="At the beginning, there were two doors. A red door and a blue door.")
    thread2 = Thread(
        tale_id=1,
        title="The Red Door",
        description="In the red door, there is a room with a bowl of candy and a vase full of lilies, as well as another red door at the far wall.")
    thread3 = Thread(
        tale_id=1,
        title="The Blue Door",
        description="In the blue door, there is a small red key on the table, as well as another blue door at the far wall.")
    thread4 = Thread(
        tale_id=1,
        title="The Joined Room",
        description="Looking behind you, you see both a red and blue door. It seems both rooms eventually led to the same destination. In here, you see a glowing fairy angrily throwing a tennis ball at the wall.")
    thread5 = Thread(
        tale_id=1,
        title="Take Candy",
        description="You take the candy and pocket it. They look very delicious.")
    thread6 = Thread(
        tale_id=1,
        title="Smell the Lilies",
        description="*sniff sniff* They're quite fragrant. How lovely.")
    thread7 = Thread(
        tale_id=1,
        title="The Second Red Door",
        description="You go through and pass the second red door in a row. It was unlocked.")
    thread8 = Thread(
        tale_id=1,
        title="The Second Blue Door",
        description="You go through and pass the second blue door in a row. It was unlocked.")
    thread9 = Thread(
        tale_id=1,
        title="Take Key",
        description="You take the little red key and put it in your pocket. This should help you out.")
    thread10 = Thread(
        tale_id=1,
        title="Talk to the Sweet Fairy",
        description="The fairy bemoans about how hungry it is, and it really wants something sweet to eat.")
    thread11 = Thread(
        tale_id=1,
        title="Give Candy",
        description="The sweet fairy is very happy, and thanks you with a smile.")
    thread12 = Thread(
        tale_id=1,
        title="Lecture Sweet Fairy About a Healthy Diet",
        description="You give the little fairy a stern talking-to about eating its vegetables to grow up healthy and strong. It seems very unhappy with you, and lapses into silence, throwing its ball with even more gusto.")
    thread13 = Thread(
        tale_id=1,
        title="Go back",
        description="You backtrack through the blue entry door to the beginning.")
    thread14 = Thread(
        tale_id=1,
        title="Go back",
        description="You backtrack through the red entry door to the beginning.")
    thread15 = Thread(
        tale_id=1,
        title="Go back to blue room",
        description="You backtrack through the blue door behind you into the blue room.")
    thread16 = Thread(
        tale_id=1,
        title="Go back to red room",
        description="You backtrack through the red door behind you into the red room.")
    # thread17 = Thread(
    #     tale_id=17,
    #     title="",
    #     description="")
    # thread18 = Thread(
    #     tale_id=18,
    #     title="",
    #     description="")
    # thread19 = Thread(
    #     tale_id=19,
    #     title="",
    #     description="")
    # thread20 = Thread(
    #     tale_id=20,
    #     title="",
    #     description="")
    db.session.add(thread1)
    db.session.add(thread2)
    db.session.add(thread3)
    db.session.add(thread4)
    db.session.add(thread5)
    db.session.add(thread6)
    db.session.add(thread7)
    db.session.add(thread8)
    db.session.add(thread9)
    db.session.add(thread10)
    db.session.add(thread11)
    db.session.add(thread12)
    db.session.add(thread13)
    db.session.add(thread14)
    db.session.add(thread15)
    db.session.add(thread16)
    db.session.commit()
    
def undo_threads():
    db.session.execute('TRUNCATE threads RESTART IDENTITY CASCADE;')
    db.session.commit()