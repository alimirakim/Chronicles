from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, DecimalField, SelectField
from wtforms.validators import DataRequired, ValidationError
from app.models import Meter
from app.utils import within_length_limit, color_choices, image_choices


class MeterForm(FlaskForm):
    """Maps form inputs to apply backend validations."""
    title = StringField(validators=[DataRequired(), within_length_limit], default="Untitled")
    description = StringField()
    color = SelectField(choices=color_choices, validators=[DataRequired()], default=color_choices[0])
    image = SelectField(choices=image_choices, validators=[DataRequired()], default=image_choices[0])
    min = IntegerField(validators=[DataRequired()], default=0)
    max = IntegerField(validators=[DataRequired()], default=20)
    base = IntegerField(validators=[DataRequired()], default=1)
    mod = DecimalField(validators=[DataRequired()], default=1)
    algo = SelectField(validators=[DataRequired()], choices=("constant", "logarithmic", "loglinear", "linear", "polynomial", "exponential", "factorial"), default="constant")
