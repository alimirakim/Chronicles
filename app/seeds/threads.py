from app.models import db, Thread, ThreadChoice

def seed_threads():
    """Seed a series of connected threads for Demo Tale."""
    
    # Creating the threads, which will be connected via 'choices' next.
    threads = [
    Thread( # 0
        tale_id=1,
        title="The Beginning",
        description="At the beginning, there were two doors. A red door and a blue door."),
    Thread( # 1
        tale_id=1,
        title="The Red Room",
        description="In the red door, there is a room with a bowl of candy and a vase full of lilies, as well as another red door at the far wall.",
        color="lightcoral",),
    Thread( # 2
        tale_id=1,
        title="The Blue Room",
        description="In the blue door, there is a small red key on the table, as well as another blue door at the far wall.",
        color="lightblue",),
    Thread( # 3
        tale_id=1,
        title="The Joined Room",
        description="Looking behind you, you see both a red and blue door. It seems both rooms eventually led to the same destination. In here, you see a glowing fairy angrily throwing a tennis ball at the wall.",
        color="mediumpurple",),
    Thread( # 4
        tale_id=1,
        title="Take Candy",
        description="You take the candy and pocket it. They look very delicious.",
        color="pink",),
    Thread( # 5
        tale_id=1,
        title="Smell the Lilies",
        description="*sniff sniff* They're quite fragrant. How lovely.",
        color="white",),
    Thread( # 6
        tale_id=1,
        title="Take Key",
        description="You take the little red key and put it in your pocket. This should help you out."),
    Thread( # 7
        tale_id=1,
        title="Talk to the Sweet Fairy",
        description="The fairy bemoans about how hungry it is, and it really wants something sweet to eat."),
    Thread( # 8
        tale_id=1,
        title="Give Candy",
        description="The sweet fairy is very happy, and thanks you with a smile."),
    Thread( # 9
        tale_id=1,
        title="Lecture Sweet Fairy About a Healthy Diet",
        description="You give the little fairy a stern talking-to about eating its vegetables to grow up healthy and strong. It seems very unhappy with you, and lapses into silence, throwing its ball with even more gusto."),
    ]
    # thread10 = Thread(
    #     tale_id=1,
    #     title="",
    #     description="")
    
    db.session.add(threads[0])
    db.session.add(threads[1])
    db.session.add(threads[2])
    db.session.add(threads[3])
    db.session.add(threads[4])
    db.session.add(threads[5])
    db.session.add(threads[6])
    db.session.add(threads[7])
    db.session.add(threads[8])
    db.session.add(threads[9])
    # db.session.add(threads[10])
    db.session.commit()


    # Adding choice-links between threads with choice-thread default titles.
    choices = (
      (0, 1), (0, 2),
      (1, 4), (1, 5),
      (2, 6),
      (3, 7),
      (7, 8), (7, 9))
    for choice in choices:
        new_choice = ThreadChoice(
            title=threads[choice[1]].title,
            current_thread=threads[choice[0]],
            choice_thread=threads[choice[1]])
        db.session.add(new_choice)


    # Adding choices with unique titles
    new_choice5 = ThreadChoice(
    title="Go through second red door",
    current_thread=threads[1],
    choice_thread=threads[3])
    
    new_choice6 = ThreadChoice(
    title="Go through second blue door",
    current_thread=threads[2],
    choice_thread=threads[3])
    
    db.session.add(new_choice5)
    db.session.add(new_choice6)
    db.session.commit()


def undo_threads():
    db.session.execute('TRUNCATE threads RESTART IDENTITY CASCADE;')
    db.session.commit()