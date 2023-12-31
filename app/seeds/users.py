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
    edward = User(
        username="edward",
        email="edward@example.com",
        password="password",
        first_name="Edward",
        last_name="Wilson",
        created_at=now,
        updated_at=now,
    )
    frank = User(
        username="frank",
        email="frank@example.com",
        password="password",
        first_name="Frank",
        last_name="Murphy",
        created_at=now,
        updated_at=now,
    )
    grace = User(
        username="grace",
        email="grace@example.com",
        password="password",
        first_name="Grace",
        last_name="Martin",
        created_at=now,
        updated_at=now,
    )
    hannah = User(
        username="hannah",
        email="hannah@example.com",
        password="password",
        first_name="Hannah",
        last_name="Davis",
        created_at=now,
        updated_at=now,
    )
    ivan = User(
        username="ivan",
        email="ivan@example.com",
        password="password",
        first_name="Ivan",
        last_name="Garcia",
        created_at=now,
        updated_at=now,
    )

    db.session.add(demo)
    db.session.add(marnie)
    db.session.add(bobbie)
    db.session.add(alice)
    db.session.add(charlie)
    db.session.add(edward)
    db.session.add(frank)
    db.session.add(grace)
    db.session.add(hannah)
    db.session.add(ivan)
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
