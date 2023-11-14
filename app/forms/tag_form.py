from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired, Length


class TagForm(FlaskForm):
    tag_name = StringField("Tag Name", validators=[DataRequired(), Length(max=255)])
