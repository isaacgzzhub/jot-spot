from flask_wtf import FlaskForm
from wtforms import StringField, TextAreaField, IntegerField
from wtforms.validators import DataRequired, Length


class NoteForm(FlaskForm):
    user_id = IntegerField("User ID", validators=[DataRequired()])
    title = StringField("Title", validators=[DataRequired(), Length(max=255)])
    content = TextAreaField("Content", validators=[DataRequired()])
