from flask_wtf import FlaskForm
from wtforms import IntegerField, DecimalField, SelectField
from wtforms.validators import DataRequired, ValidationError
from app.models import Meter
from app.utils import within_length_limit


class MeterForm(FlaskForm):
    """Maps form inputs to apply backend validations."""
    min = IntegerField(validators=[DataRequired()], default=1)
    max = IntegerField(validators=[DataRequired()], default=20)
    base = IntegerField(validators=[DataRequired()], default=100)
    mod = DecimalField(validators=[DataRequired()], default=100)
    algorithm = SelectField(validators=[DataRequired()], choices=("constant", "log", "loglinear", "linear", "polynomial", "exponential", "factorial"), default="constant")
