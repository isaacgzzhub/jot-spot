from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import Note, db
from app.forms.note_form import NoteForm

note_routes = Blueprint("notes", __name__)


# Get all notes
@note_routes.route("/")
@login_required
def get_notes():
    """
    Query for all notes and return them in a list of note dictionaries
    """
    notes = Note.query.all()
    return jsonify([note.to_dict() for note in notes])


# Create a note
@note_routes.route("/", methods=["POST"])
@login_required
def create_note():
    """
    Create a new note and return it
    """
    form = NoteForm()
    form["csrf_token"].data = request.cookies["csrf_token"]
    if form.validate_on_submit():
        note = Note(
            user_id=current_user.id, title=form.title.data, content=form.content.data
        )
        db.session.add(note)
        db.session.commit()
        return jsonify(note.to_dict()), 201
    else:
        return {"errors": [form.errors]}, 400


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
    Delete a note and return confirmation of deletion
    """
    note = Note.query.get(note_id)
    if note:
        db.session.delete(note)
        db.session.commit()
        return jsonify({"message": "Note deleted successfully"}), 200
    else:
        return jsonify({"error": "Note not found"}), 404


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
