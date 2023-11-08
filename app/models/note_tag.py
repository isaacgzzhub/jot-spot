from .db import db, environment, SCHEMA, add_prefix_for_prod


class NoteTag(db.Model):
    __tablename__ = "notes_tags"

    if environment == "production":
        __table_args__ = {"schema": SCHEMA}

    note_id = db.Column(
        db.Integer, db.ForeignKey(add_prefix_for_prod("notes.id")), primary_key=True
    )
    tag_id = db.Column(
        db.Integer, db.ForeignKey(add_prefix_for_prod("tags.id")), primary_key=True
    )

    note = db.relationship("Note", back_populates="note_tags", lazy=True)
    tag = db.relationship("Tag", back_populates="note_tags", lazy=True)

    def to_dict(self):
        return {"note_id": self.note_id, "tag_id": self.tag_id}
