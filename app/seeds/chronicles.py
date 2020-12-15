from app.models import db, Chronicle


def seed_chronicles():
    """Seed a chronicle for Demo user."""
    chronicle1 = Chronicle(
        user_id=1,
        title="Demo Chronicle",
        description="A demonstration of the Iris Isle tale-spinner.",
        color="rgb(70,60,70)",
        image="book",
        )
    chronicle2 = Chronicle(
        user_id=1,
        title="Romantic Sphinx",
        description="Two sphinx in love.",
        color="rgb(70,60,70)",
        image="heart",
        )
    chronicle3 = Chronicle(
        user_id=1,
        title="The Three Atlamillia",
        description="Travel to the past and future to find your mom and discover the true secret of the great Emperor Grippin.",
        color="rgb(70,60,70)",
        image="gem",
        )
    chronicle4 = Chronicle(
        user_id=1,
        title="A Modern Tale of Capitalist Glory",
        description="Win big. Crush your competition. Become the Boss. Or die trying.",
        color="rgb(70,60,70)",
        image="coins",
        )
    chronicle5 = Chronicle(
        user_id=1,
        title="Sophie's Adventures",
        description="A family-friendly children's adventure game, meant to be played together with your parent! :) Please enjoy. Updated with a new Tale every Friday, 7 PST.",
        color="rgb(70,60,70)",
        image="mountain",
        )
    chronicle6 = Chronicle(
        user_id=2,
        title="Untitled",
        description="WIP (don't look, go away, I can't find the privacy settings)",
        color="rgb(70,60,70)",
        image="poop",
        )
    
    db.session.add(chronicle1)
    db.session.add(chronicle2)
    db.session.add(chronicle3)
    db.session.add(chronicle4)
    db.session.add(chronicle5)
    db.session.add(chronicle6)
    db.session.commit()
    
def undo_chronicles():
    db.session.execute('TRUNCATE chronicles RESTART IDENTITY CASCADE;')
    db.session.commit()