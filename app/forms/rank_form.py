from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired, ValidationError
from app.models import Rank
from app.utils import within_length_limit


class RankForm(FlaskForm):
    """Maps form inputs to apply backend validations."""
    title = StringField(validators=[DataRequired(), within_length_limit], default="Untitled")
    description = StringField()
    # color = SelectField(choices=range(1,12), validators=[DataRequired()], default=1)
    # image = SelectField(choices=range(1,12), validators=[DataRequired()], default=1)
    # TODO Choices how? Effects, locks?