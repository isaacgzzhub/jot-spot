from .db import db


class Contributor(db.Model):
    __tablename__ = "contributors"
    note_id = db.Column(db.Integer, db.ForeignKey("notes.id"), primary_key=True)
    contributor_id = db.Column(db.Integer, db.ForeignKey("users.id"), primary_key=True)
    can_edit = db.Column(db.Boolean, nullable=False, default=False)

    user = db.relationship("User", backref="contributed_notes")
    note = db.relationship("Note", backref="note_contributors")

    def to_dict(self):
        return {
            "note_id": self.note_id,
            "contributor_id": self.contributor_id,
            "can_edit": self.can_edit,
        }
