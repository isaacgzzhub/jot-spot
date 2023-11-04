from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import Tag, db

tag_routes = Blueprint("tags", __name__)


# Get all tags for the current user
@tag_routes.route("/")
@login_required
def get_tags():
    """
    Query for all tags belonging to the current user and return them in a list
    """
    tags = Tag.query.filter_by(user_id=current_user.id).all()
    return jsonify([tag.to_dict() for tag in tags]), 200


# Create a tag
@tag_routes.route("/", methods=["POST"])
@login_required
def create_tag():
    """
    Create a new tag for the current user and return it
    """
    data = request.get_json()
    tag = Tag(user_id=current_user.id, tag_name=data["tag_name"])
    db.session.add(tag)
    db.session.commit()
    return jsonify(tag.to_dict()), 201


# Update a tag
@tag_routes.route("/<int:tag_id>", methods=["PUT"])
@login_required
def update_tag(tag_id):
    """
    Update a tag's name and return the updated tag
    """
    data = request.get_json()
    tag = Tag.query.filter_by(id=tag_id, user_id=current_user.id).first()
    if tag:
        tag.tag_name = data["tag_name"]
        db.session.commit()
        return jsonify(tag.to_dict()), 200
    else:
        return (
            jsonify(
                {"error": "Tag not found or you do not have permission to edit it"}
            ),
            404,
        )


# Delete a tag
@tag_routes.route("/<int:tag_id>", methods=["DELETE"])
@login_required
def delete_tag(tag_id):
    """
    Delete a tag and return confirmation of deletion
    """
    tag = Tag.query.filter_by(id=tag_id, user_id=current_user.id).first()
    if tag:
        db.session.delete(tag)
        db.session.commit()
        return jsonify({"message": "Tag deleted successfully"}), 200
    else:
        return (
            jsonify(
                {"error": "Tag not found or you do not have permission to delete it"}
            ),
            404,
        )
