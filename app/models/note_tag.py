from .db import db


class NotesTags(db.Model):
    __tablename__ = "notes_tags"
    note_id = db.Column(db.Integer, db.ForeignKey("notes.id"), primary_key=True)
    tag_id = db.Column(db.Integer, db.ForeignKey("tags.id"), primary_key=True)

    def to_dict(self):
        return {"note_id": self.note_id, "tag_id": self.tag_id}
