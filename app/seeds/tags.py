from app.models import db, Tag, environment, SCHEMA
from sqlalchemy.sql import text
from datetime import datetime


def seed_tags():
    now = datetime.now()

    tag1 = Tag(user_id=1, tag_name="Urgent", created_at=now, updated_at=now)
    tag2 = Tag(user_id=1, tag_name="Personal", created_at=now, updated_at=now)
    tag3 = Tag(user_id=2, tag_name="Work", created_at=now, updated_at=now)
    tag4 = Tag(user_id=2, tag_name="Study", created_at=now, updated_at=now)
    tag5 = Tag(user_id=3, tag_name="Home", created_at=now, updated_at=now)

    db.session.add(tag1)
    db.session.add(tag2)
    db.session.add(tag3)
    db.session.add(tag4)
    db.session.add(tag5)
    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_tags():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.tags RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM tags"))

    db.session.commit()
