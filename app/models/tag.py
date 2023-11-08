from .db import db, environment, SCHEMA, add_prefix_for_prod


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
    note_tags = db.relationship(
        "NoteTag",
        back_populates="tag",
        lazy="dynamic",
    )

    def to_dict(self):
        return {
            "id": self.id,
            "user_id": self.user_id,
            "tag_name": self.tag_name,
        }
