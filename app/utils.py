

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