from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import Note, Contributor, NoteTag, Tag, db
from app.forms.note_form import NoteForm

note_routes = Blueprint("notes", __name__)


# Get all notes
@note_routes.route("/")
@login_required
def get_notes():
    """
    Query for notes created by the current user and notes where the current user is a contributor.
    """
    created_notes = Note.query.filter_by(user_id=current_user.id).all()
    # Adjusted join query using the Contributor model
    shared_notes = (
        Note.query.join(Contributor, Note.id == Contributor.note_id)
        .filter(Contributor.contributor_id == current_user.id)
        .all()
    )

    all_notes = list(set(created_notes + shared_notes))
    return jsonify([note.to_dict() for note in all_notes])


# Get all my notes
@note_routes.route("/user")
@login_required
def get_user_notes():
    """
    Query for notes created by the current user.
    """
    notes = Note.query.filter_by(user_id=current_user.id).all()
    return jsonify([note.to_dict() for note in notes])


# Create a note
@note_routes.route("/", methods=["POST"])
@login_required
def create_note():
    """
    Create a new note and return it, along with associated tags.
    """
    data = request.get_json()
    title = data.get("title")
    content = data.get("content")
    tag_ids = data.get("tagIds", [])

    if title and content:
        note = Note(user_id=current_user.id, title=title, content=content)
        db.session.add(note)
        db.session.commit()

        for tag_id in tag_ids:
            if Tag.query.get(tag_id):
                note_tag = NoteTag(note_id=note.id, tag_id=tag_id)
                db.session.add(note_tag)

        db.session.commit()
        return jsonify(note.to_dict()), 201
    else:
        return {"errors": ["Invalid data provided"]}, 400


# Update a note
@note_routes.route("/<int:note_id>", methods=["PUT"])
@login_required
def update_note(note_id):
    """
    Update a note and return the updated note
    """
    data = request.get_json()
    note = Note.query.get(note_id)
    if note:
        note.title = data.get("title", note.title)
        note.content = data.get("content", note.content)
        db.session.commit()
        return jsonify(note.to_dict())
    else:
        return jsonify({"error": "Note not found"}), 404


# Delete a note
@note_routes.route("/<int:note_id>", methods=["DELETE"])
@login_required
def delete_note(note_id):
    """
    Delete a note and its associated tags.
    """
    note = Note.query.get(note_id)

    if note and note.user_id == current_user.id:
        NoteTag.query.filter_by(note_id=note_id).delete()

        db.session.delete(note)
        db.session.commit()
        return jsonify({"message": "Note deleted successfully"}), 200
    else:
        return jsonify({"error": "Note not found or unauthorized"}), 404


# Get a single note
@note_routes.route("/<int:note_id>")
@login_required
def get_note(note_id):
    """
    Query for a note by id and return it
    """
    note = Note.query.get(note_id)
    if note:
        return jsonify(note.to_dict())
    else:
        return jsonify({"error": "Note not found"}), 404


# Get notes by tag
@note_routes.route("/tags/<int:tag_id>")
@login_required
def get_notes_by_tag(tag_id):
    """
    Get all notes associated with a specific tag.
    """
    notes = Note.query.join(NoteTag).filter(NoteTag.tag_id == tag_id).all()
    return jsonify([note.to_dict() for note in notes])
