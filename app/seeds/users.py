from app.models import db, User, environment, SCHEMA
from sqlalchemy.sql import text
from datetime import datetime


def seed_users():
    now = datetime.now()

    demo = User(
        username="Demo",
        email="demo@example.com",
        password="password",
        first_name="Demo",
        last_name="User",
        created_at=now,
        updated_at=now,
    )
    marnie = User(
        username="marnie",
        email="marnie@example.com",
        password="password",
        first_name="Marnie",
        last_name="Smith",
        created_at=now,
        updated_at=now,
    )
    bobbie = User(
        username="bobbie",
        email="bobbie@example.com",
        password="password",
        first_name="Bobbie",
        last_name="Jones",
        created_at=now,
        updated_at=now,
    )
    alice = User(
        username="alice",
        email="alice@example.com",
        password="password",
        first_name="Alice",
        last_name="Johnson",
        created_at=now,
        updated_at=now,
    )
    charlie = User(
        username="charlie",
        email="charlie@example.com",
        password="password",
        first_name="Charlie",
        last_name="Brown",
        created_at=now,
        updated_at=now,
    )

    db.session.add(demo)
    db.session.add(marnie)
    db.session.add(bobbie)
    db.session.add(alice)
    db.session.add(charlie)
    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_users():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.users RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM users"))

    db.session.commit()
