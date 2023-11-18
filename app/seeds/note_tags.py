from app.models import db, NoteTag, environment, SCHEMA
from sqlalchemy.sql import text


def seed_note_tags():
    note_tag1 = NoteTag(note_id=1, tag_id=1)
    note_tag2 = NoteTag(note_id=1, tag_id=2)
    note_tag3 = NoteTag(note_id=2, tag_id=1)
    note_tag4 = NoteTag(note_id=3, tag_id=3)
    note_tag5 = NoteTag(note_id=4, tag_id=4)
    note_tag6 = NoteTag(note_id=5, tag_id=2)
    note_tag7 = NoteTag(note_id=6, tag_id=3)
    note_tag8 = NoteTag(note_id=7, tag_id=1)
    note_tag9 = NoteTag(note_id=8, tag_id=2)
    note_tag10 = NoteTag(note_id=9, tag_id=3)
    note_tag11 = NoteTag(note_id=10, tag_id=4)
    note_tag12 = NoteTag(note_id=10, tag_id=1)

    db.session.add(note_tag1)
    db.session.add(note_tag2)
    db.session.add(note_tag3)
    db.session.add(note_tag4)
    db.session.add(note_tag5)
    db.session.add(note_tag6)
    db.session.add(note_tag7)
    db.session.add(note_tag8)
    db.session.add(note_tag9)
    db.session.add(note_tag10)
    db.session.add(note_tag11)
    db.session.add(note_tag12)
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
