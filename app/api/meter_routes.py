from flask import Blueprint, jsonify, request
from flask_login import current_user
from app.models import db, Meter
from app.utils import validation_errors_to_messages
from app.forms import MeterForm

meter_routes = Blueprint("meters", __name__)


@meter_routes.route("/<int:plid>/edit", methods=["PATCH"])
def edit_meter(plid):
    """Edit a meter."""
    form = MeterForm()
    form["csrf_token"].data = request.cookies["csrf_token"]
    
    if form.validate_on_submit():
        meter = Meter.query.get(plid)
        meter.title = form["title"].data
        meter.description = form["description"].data
        meter.color = form["color"].data
        meter.image = form["image"].data
        meter.min = form["min"].data
        meter.max = form["max"].data
        meter.base = form["base"].data
        meter.mod = form["mod"].data
        meter.algo = form["algo"].data
        db.session.commit()
        return meter.to_dict()
    else:
        return {"errors": validation_errors_to_messages(form.errors)}, 401


@meter_routes.route("/<int:plid>/delete", methods=["DELETE"])
def delete_meter(plid):
    """Delete a meter and all its dependents"""
    meter = Meter.query.get(plid)
    db.session.delete(meter)
    db.session.commit()
    return "Deleted that lil' meter for you ;M"