from flask import Blueprint, jsonify, request
from flask_login import current_user
from app.models import db, Chronicle, Tale, Thread, ThreadChoice
from app.utils import validation_errors_to_messages

chronicle_routes = Blueprint("chronicles", __name__)


@chronicle_routes.route("/create", methods=["POST"])
def create_chronicle():
    """Create a new chronicle for a user."""
    form = ChronicleForm()
    form["csrf_token"].data = request.cookies["csrf_token"]
    
    if form.validate_on_submit():
        chronicle = Chronicle(
            user_id=current_user.id,
            title=form["title"].data,
            description=form["description"].data)
        db.session.add(chronicle)
        db.session.commit()
        return jsonify(chronicle.to_dict())
    else:
      return {"errors": validation_errors_to_messages(form.errors)}, 401


@chronicle_routes.route("/<int:cid>/edit", methods=["PATCH"])
def edit_chronicle(cid):
    """Edit a chronicle."""
    form = ChronicleForm()
    form["csrf_token"].data = request.cookies["csrf_token"]
    
    if form.validate_on_submit():
        chronicle = Chronicle.query.get(cid)
        chronicle.title = form["title"].data
        chronicle.description = form["description"].data
        db.session.commit()
        return jsonify(chronicle.to_dict())
    else:
        return {"errors": validation_errors_to_messages(form.errors)}, 401


@chronicle_routes.route("/<int:cid>/delete", methods=["DELETE"])
def delete_chronicle(cid):
    """Delete a chronicle and all its dependents like characters, places, assets, tales, threads, etc."""
    chronicle = Chronicle.query.get(cid)
    db.session.delete(chronicle)
    db.session.commit()
    return "Chronicle successfully deleted! ;B"


@chronicle_routes.route("/<int:cid>/tales/create", methods=["POST"])
def create_tale(cid):
    """Create a new tale that belongs to a chronicle"""
    form = TaleForm()
    form["csrf_token"].data = request.cookies["csrf_token"]
    
    if form.validate_on_submit():
        tale = Tale(
            chronicle_id=cid,
            title=form["title"].data,
            description=form["description"].data)
        db.session.add(tale)
        db.session.commit()
        return jsonify(tale.to_dict())
    else:
        return {"errors": validation_errors_to_messages(form.errors)}, 401



# @chronicle_routes.route("/")



# @chronicle_routes.route("/")
