from wtforms.validators import ValidationError
from pprint import pprint
from app.models import db, Chronicle, Tale, Thread, ThreadChoice


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
    chronicles = Chronicle.query \
        .filter(Chronicle.user_id == uid) \
        .options(db.joinedload(Chronicle.tales).joinedload(Tale.threads).joinedload(Thread.choices)) \
        .all()

    # Normalize data before returning
    tales = {}
    threads = {}
    choices = {}

    for chronicle in chronicles:
        for tale in chronicle.tales:
            tales[tale.id] = tale.to_dict()
            for thread in tale.threads:
                threads[thread.id] = thread.to_dict()
                for choice in thread.choices:
                    choices[choice.id] = choice.to_dict()
    chronicles = {chronicle.id:chronicle.to_dict() for chronicle in chronicles}
    
    print("\n\nUSER, CHRONICLES, TALES, THREADS, CHOICES")
    pprint(uid)
    pprint(chronicles)
    pprint(tales)
    pprint(threads)
    pprint(choices)
    
    return chronicles, tales, threads, choices
