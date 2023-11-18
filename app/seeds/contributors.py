from app.models import db, Contributor, environment, SCHEMA
from sqlalchemy.sql import text


def seed_contributors():
    contributor1 = Contributor(
        note_id=1,
        contributor_id=2,
        can_edit=True,
    )
    contributor2 = Contributor(
        note_id=2,
        contributor_id=3,
        can_edit=True,
    )
    contributor3 = Contributor(
        note_id=3,
        contributor_id=4,
        can_edit=False,
    )
    contributor4 = Contributor(
        note_id=4,
        contributor_id=5,
        can_edit=True,
    )
    contributor5 = Contributor(
        note_id=5,
        contributor_id=1,
        can_edit=False,
    )
    contributor6 = Contributor(
        note_id=6,
        contributor_id=2,
        can_edit=False,
    )
    contributor7 = Contributor(
        note_id=7,
        contributor_id=3,
        can_edit=True,
    )
    contributor8 = Contributor(
        note_id=8,
        contributor_id=4,
        can_edit=False,
    )
    contributor9 = Contributor(
        note_id=9,
        contributor_id=5,
        can_edit=True,
    )
    contributor10 = Contributor(
        note_id=10,
        contributor_id=1,
        can_edit=True,
    )

    db.session.add(contributor1)
    db.session.add(contributor2)
    db.session.add(contributor3)
    db.session.add(contributor4)
    db.session.add(contributor5)
    db.session.add(contributor6)
    db.session.add(contributor7)
    db.session.add(contributor8)
    db.session.add(contributor9)
    db.session.add(contributor10)
    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_contributors():
    if environment == "production":
        db.session.execute(
            f"TRUNCATE table {SCHEMA}.contributors RESTART IDENTITY CASCADE;"
        )
    else:
        db.session.execute(text("DELETE FROM contributors"))

    db.session.commit()
