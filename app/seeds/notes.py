from app.models import db, Note, environment, SCHEMA
from sqlalchemy.sql import text
from datetime import datetime


def seed_notes():
    now = datetime.now()

    note1 = Note(
        user_id=1,
        title="First Note",
        content="This is the content of the first note.",
        created_at=now,
        updated_at=now,
    )
    note2 = Note(
        user_id=1,
        title="Second Note",
        content="This is the content of the second note.",
        created_at=now,
        updated_at=now,
    )
    note3 = Note(
        user_id=2,
        title="Third Note",
        content="This is the content of the third note.",
        created_at=now,
        updated_at=now,
    )
    note4 = Note(
        user_id=2,
        title="Fourth Note",
        content="This is the content of the fourth note.",
        created_at=now,
        updated_at=now,
    )
    note5 = Note(
        user_id=3,
        title="Fifth Note",
        content="This is the content of the fifth note.",
        created_at=now,
        updated_at=now,
    )

    db.session.add(note1)
    db.session.add(note2)
    db.session.add(note3)
    db.session.add(note4)
    db.session.add(note5)
    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_notes():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.notes RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM notes"))

    db.session.commit()
