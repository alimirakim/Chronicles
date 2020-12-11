from flask_wtf import FlaskForm
from wtforms import StringField, SelectField
from wtforms.validators import DataRequired, ValidationError
from app.models import Chronicle
from app.utils import within_length_limit, color_choices, image_choices


class ChronicleForm(FlaskForm):
    """Maps form inputs to apply backend validations."""
    title = StringField(validators=[DataRequired(), within_length_limit], default="Untitled")
    description = StringField()
    color = SelectField(choices=color_choices, validators=[DataRequired()], default=color_choices[0])
    image = SelectField(choices=image_choices, validators=[DataRequired()], default=image_choices[0])
