from flask import Blueprint, jsonify, request
from flask_login import current_user
from app.models import db, Condition
from app.utils import validation_errors_to_messages
from app.forms import ConditionForm

condition_routes = Blueprint("conditions", __name__)


@condition_routes.route("/<int:plid>/edit", methods=["PATCH"])
def edit_condition(plid):
    """Edit a condition."""
    form = ConditionForm()
    form["csrf_token"].data = request.cookies["csrf_token"]
    
    if form.validate_on_submit():
        condition = Condition.query.get(plid)
        condition.title = form["title"].data
        condition.description = form["description"].data
        # condition.color = form["color"].data
        # condition.image = form["image"].data
        db.session.commit()
        return condition.to_dict()
    else:
        return {"errors": validation_errors_to_messages(form.errors)}, 401


@condition_routes.route("/<int:plid>/delete", methods=["DELETE"])
def delete_condition(plid):
    """Delete a condition and all its dependents"""
    condition = Condition.query.get(plid)
    db.session.delete(condition)
    db.session.commit()
    return "Deleted that lil' condition for you ;M"