from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired, ValidationError
from app.models import Thread
from app.utils import within_length_limit


class ThreadForm(FlaskForm):
    """Maps form inputs to apply backend validations."""
    title = StringField(validators=[DataRequired(), within_length_limit])
    description = StringField()
    # TODO Choices how? Effects, locks?