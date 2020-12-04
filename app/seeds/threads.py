from app.models import db, Thread

def seed_threads():
    """See a series of connected threads for Demo Tale."""
    thread1 = Thread(
        tale_id=1,
        title="The Beginning",
        body="At the beginning, there were two doors. A red door and a blue door.")
    thread2 = Thread(
        tale_id=2,
        title="The Red Door",
        body="In the red door, there is a room with a bowl of candy and a vase full of lilies, as well as another red door at the far wall.")
    thread3 = Thread(
        tale_id=3,
        title="The Blue Door",
        body="In the blue door, there is a small red key on the table, as well as another blue door at the far wall.")
    thread4 = Thread(
        tale_id=4,
        title="The Joined Room",
        body="Looking behind you, you see both a red and blue door. It seems both rooms eventually led to the same destination. In here, you see a glowing fairy angrily throwing a tennis ball at the wall.")
    thread5 = Thread(
        tale_id=5,
        title="Take Candy",
        body="You take the candy and pocket it. They look very delicious.")
    thread6 = Thread(
        tale_id=6,
        title="Smell the Lilies",
        body="*sniff sniff* They're quite fragrant. How lovely.")
    thread7 = Thread(
        tale_id=7,
        title="The Second Red Door",
        body="You go through and pass the second red door in a row. It was unlocked.")
    thread8 = Thread(
        tale_id=8,
        title="The Second Blue Door",
        body="You go through and pass the second blue door in a row. It was unlocked.")
    thread9 = Thread(
        tale_id=9,
        title="Take Key",
        body="You take the little red key and put it in your pocket. This should help you out.")
    thread10 = Thread(
        tale_id=10,
        title="Talk to the Sweet Fairy",
        body="The fairy bemoans about how hungry it is, and it really wants something sweet to eat.")
    thread11 = Thread(
        tale_id=11,
        title="Give Candy",
        body="The sweet fairy is very happy, and thanks you with a smile.")
    thread12 = Thread(
        tale_id=12,
        title="Lecture Sweet Fairy About a Healthy Diet",
        body="You give the little fairy a stern talking-to about eating its vegetables to grow up healthy and strong. It seems very unhappy with you, and lapses into silence, throwing its ball with even more gusto.")
    thread13 = Thread(
        tale_id=13,
        title="Go back",
        body="You backtrack through the blue entry door to the beginning.")
    thread14 = Thread(
        tale_id=14,
        title="Go back",
        body="You backtrack through the red entry door to the beginning.")
    thread15 = Thread(
        tale_id=15,
        title="Go back to blue room",
        body="You backtrack through the blue door behind you into the blue room.")
    thread16 = Thread(
        tale_id=16,
        title="Go back to red room",
        body="You backtrack through the red door behind you into the red room.")
    # thread17 = Thread(
    #     tale_id=17,
    #     title="",
    #     body="")
    # thread18 = Thread(
    #     tale_id=18,
    #     title="",
    #     body="")
    # thread19 = Thread(
    #     tale_id=19,
    #     title="",
    #     body="")
    # thread20 = Thread(
    #     tale_id=20,
    #     title="",
    #     body="")
    db.session.add(thread1, thread2, thread3, thread4, thread5, 
        thread6, thread7, thread8, thread9, thread10,
        thread11, thread12, thread13, thread14, thread15, thread16)
    
    
def undo_threads():
    db.session.execute('TRUNCATE threads CASCADE;')
    db.session.commit()