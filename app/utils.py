from wtforms.validators import ValidationError
from pprint import pprint
from app.models import db, Chronicle, Tale, Thread, ThreadChoice, Entity


def validation_errors_to_messages(validation_errors):
    """
    Simple function that turns the WTForms validation errors into a simple list
    """
    errorMessages = []
    for field in validation_errors:
        for error in validation_errors[field]:
            errorMessages.append(f"{field} : {error}")
    return errorMessages
    
    
def within_length_limit(form, field):
    """Check if the input is below the max length limit allowed."""
    value = field.data
    if len(value) > 250:
        raise ValidationError("Max length of titles is 250 characters.")
      
      
def get_and_normalize_all_data_for_user(uid):
    """
    Get all a user's data to set-up their frontend store, including chronicles,
    tales, threads, choices, characters, etc., then normalize into dictionaries.
    """
    # Query all a user's chronicles
    chronicles = Chronicle.query.filter(Chronicle.user_id == uid).options( \
        db.joinedload(Chronicle.tales) \
        .joinedload(Tale.threads) \
        .joinedload(Thread.effects) \
        , db.joinedload(Chronicle.tales) \
        .joinedload(Tale.threads) \
        .joinedload(Thread.choices) \
        .joinedload(ThreadChoice.locks) \
        , db.joinedload(Chronicle.entities) \
        .joinedload(Entity.assets)) \
        .all()

    # Normalize data before returning
    tales = {}
    threads = {}
    choices = {}
    characters = {}
    places = {}
    assets = {}
    conditions = {}

    for chronicle in chronicles:
        for entity in chronicle.entities:
            if entity.type == "asset":
                assets[entity.id] = entity.to_dict()
            elif entity.type == "character":
                characters[entity.id] = entity.to_dict()
            elif entity.type == "place":
                places[entity.id] = entity.to_dict()
            elif entity.type == "condition":
                conditions[entity.id] = entity.to_dict()
            # elif entity.type == "rank": ???
            #     ranks[entity.id] = entity.to_dict() ???
        for tale in chronicle.tales:
            tales[tale.id] = tale.to_dict()
            for thread in tale.threads:
                threads[thread.id] = thread.to_dict()
                for choice in thread.choices:
                    choices[choice.id] = choice.to_dict()
                        
    chronicles = {chronicle.id:chronicle.to_dict() for chronicle in chronicles}
    
    print("\n\nUSER, CHRONICLES, TALES, THREADS, CHOICES")
    pprint(uid)
    # pprint(chronicles)
    # pprint(tales)
    # pprint(threads)
    # pprint(choices)
    
    return chronicles, tales, threads, choices, characters, places, assets, conditions



def createChoices(choices_data, thread):
    """
    Convert json data into new thread_choice records in the database,
    then return a dictionary compilation of the choices.
    """
    # Create choices that new thread connects to
    choices = {}
    for choice in choices_data:
        # TODO Check if 'choices' is object so as to grab alt title.
        thread_choice = ThreadChoice(
            title= choice["title"],
            current_thread=thread,
            choice_thread_id=choice["choice_thread_id"],
            color=choice["color"],
            image=choice["image"],
            )
        db.session.add(thread_choice)
        db.session.commit()
        choices[thread_choice.id] = thread_choice.to_dict()
    return choices


def createEffects(effects_data, thread):
    """
    Convert json data into new effect records in the database,
    then return a dictionary compilation of the effects.
    """
    # Create effects that new thread connects to
    effects = {}
    for effect_data in effects_data:
        # TODO Check if 'effects' is object so as to grab alt title.
        effect = Effect(
            title= effect_data["title"],
            thread=thread,
            type=effect_data["type"],
            color=effect_data["color"],
            image=effect_data["image"],
            )
        # Create and populate the subtype of the effect
        if effect.type == "asset":
            fin_effect = AssetEffect(
                effect=effect,
                asset_id=effect_data["asset"],
                quantity=effect_data["quantity"],
                is_gained=effect_data["is_gained"],
                )
        db.session.add(fin_effect)
        db.session.commit()
        effect[effect.id] = fin_effect.to_dict()
    return effect


def createLocks(locks_data, thread):
    """
    Convert json data into new lock records in the database,
    then return a dictionary compilation of the locks.
    """
    # Create locks that new thread connects to
    locks = {}
    for lock_data in locks_data:
        # TODO Check if 'choices' is object so as to grab alt title.
        lock = Lock(
            title= lock_data["title"],
            type=lock_data["type"],
            choice_id=lock_data["choice_id"],
            color=lock_data["color"],
            image=lock_data["image"],
            )
        if lock_data["type"] == "asset":
            fin_lock = AssetLock(
                lock=lock,
                asset_id=lock_data["asset_id"],
                quantity=lock_data["quantity"],
                type=lock_data["asset_type"],
            )
        db.session.add(fin_lock)
        db.session.commit()
        locks[lock.id] = fin_lock.to_dict()
    return locks
    
    

color_choices = [
    "gray",
    "black",
    "white",
    "red", 
    "orange", 
    "yellow", 
    "green", 
    "blue", 
    "purple", 
    "pink", 
    "brown"
]
image_choices = [
    "default",
    "default_user",
    "default_chronicle",
    "default_entity",
    "default_asset",
    "default_condition",
    "default_meter",
    "default_tale",
    "default_thread",
    "default_effect",
    "default_choice",
    "default_lock",
]
