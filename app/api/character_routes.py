from flask import Blueprint, jsonify, request
from flask_login import current_user
from app.models import db, Character, Asset
from app.utils import validation_errors_to_messages
from app.forms import CharacterForm

character_routes = Blueprint("characters", __name__)


@character_routes.route("/<int:chaid>/edit", methods=["PATCH"])
def edit_character(chaid):
    """
    Edit a character and its associated data like assets, conditions, and ranks.
    """
    form = CharacterForm()
    form["csrf_token"].data = request.cookies["csrf_token"]
    
    if form.validate_on_submit():
        character = Character.query.get(chaid)
        character.title = form["title"].data
        character.description = form["description"].data
        # character.color = form["color"].data
        # character.image = form["image"].data
        db.session.commit()
        return character.to_dict()
    else:
        return {"errors": validation_errors_to_messages(form.errors)}, 401


@character_routes.route("/<int:chaid>/delete", methods=["DELETE"])
def delete_character(chaid):
    """Delete a character and all its dependents like assets, ranks, etc."""
    character = Character.query.get(chaid)
    db.session.delete(character)
    db.session.commit()
    return "Deleted that lil' character for you ;M"
