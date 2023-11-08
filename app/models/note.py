from .db import db, environment, SCHEMA, add_prefix_for_prod


class Note(db.Model):
    __tablename__ = "notes"

    if environment == "production":
        __table_args__ = {"schema": SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(
        db.Integer, db.ForeignKey(add_prefix_for_prod("users.id")), nullable=False
    )
    title = db.Column(db.String(255), nullable=False)
    content = db.Column(db.Text, nullable=False)
    created_at = db.Column(db.DateTime, server_default=db.func.current_timestamp())
    updated_at = db.Column(
        db.DateTime,
        server_default=db.func.current_timestamp(),
        server_onupdate=db.func.current_timestamp(),
    )

    tags = db.relationship(
        "Tag",
        secondary="notes_tags",
        back_populates=db.back_populates("notes", lazy="dynamic"),
    )
    contributors = db.relationship("Contributor", back_populates="note", lazy=True)

    def to_dict(self):
        return {
            "id": self.id,
            "user_id": self.user_id,
            "title": self.title,
            "content": self.content,
            "created_at": self.created_at.isoformat(),
            "updated_at": self.updated_at.isoformat(),
            "tags": [tag.to_dict() for tag in self.tags],
        }
