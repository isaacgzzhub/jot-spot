from app.models import db, NoteTag, environment, SCHEMA
from sqlalchemy.sql import text


def seed_note_tags():
    note_tag1 = NoteTag(note_id=1, tag_id=1)
    note_tag2 = NoteTag(note_id=1, tag_id=2)
    note_tag3 = NoteTag(note_id=2, tag_id=1)
    note_tag4 = NoteTag(note_id=3, tag_id=3)
    note_tag5 = NoteTag(note_id=4, tag_id=4)

    # Add NoteTag instances to the session
    db.session.add(note_tag1)
    db.session.add(note_tag2)
    db.session.add(note_tag3)
    db.session.add(note_tag4)
    db.session.add(note_tag5)
    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_note_tags():
    if environment == "production":
        db.session.execute(
            f"TRUNCATE table {SCHEMA}.note_tags RESTART IDENTITY CASCADE;"
        )
    else:
        db.session.execute(text("DELETE FROM note_tags"))

    db.session.commit()
