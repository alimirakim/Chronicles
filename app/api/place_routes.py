from flask import Blueprint, jsonify, request
from flask_login import current_user
from app.models import db, Place
from app.utils import validation_errors_to_messages
from app.forms import PlaceForm

place_routes = Blueprint("places", __name__)


@place_routes.route("/<int:plid>/edit", methods=["PATCH"])
def edit_place(plid):
    """Edit a place."""
    form = PlaceForm()
    form["csrf_token"].data = request.cookies["csrf_token"]
    
    if form.validate_on_submit():
        place = Place.query.get(plid)
        place.title = form["title"].data
        place.description = form["description"].data
        # place.color = form["color"].data
        # place.image = form["image"].data
        db.session.commit()
        return place.to_dict()
    else:
        return {"errors": validation_errors_to_messages(form.errors)}, 401


@place_routes.route("/<int:plid>/delete", methods=["DELETE"])
def delete_place(plid):
    """Delete a place and all its dependents"""
    place = Place.query.get(plid)
    db.session.delete(place)
    db.session.commit()
    return "Deleted that lil' place for you ;M"