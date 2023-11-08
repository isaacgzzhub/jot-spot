from .db import db, environment, SCHEMA, add_prefix_for_prod
from .note_tag import NotesTags


class Tag(db.Model):
    __tablename__ = "tags"

    if environment == "production":
        __table_args__ = {"schema": SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(
        db.Integer, db.ForeignKey(add_prefix_for_prod("users.id")), nullable=False
    )
    tag_name = db.Column(db.String(255), nullable=False)

    user = db.relationship("User", back_populates="tags")
    notes = db.relationship(
        "Note",
        secondary="notes_tags",
        back_populates="tags",
        lazy="dynamic",
    )

    def to_dict(self):
        return {
            "id": self.id,
            "user_id": self.user_id,
            "tag_name": self.tag_name,
        }
