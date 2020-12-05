from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired, ValidationError
from app.models import Place
from app.utils import within_length_limit


class PlaceForm(FlaskForm):
    """Maps form inputs to apply backend validations."""
    name = StringField(validators=[DataRequired(), within_length_limit])
    description = StringField()