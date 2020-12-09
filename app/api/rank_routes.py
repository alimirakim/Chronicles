from flask import Blueprint, jsonify, request
from flask_login import current_user
from app.models import db, Rank
from app.utils import validation_errors_to_messages
from app.forms import RankForm

rank_routes = Blueprint("ranks", __name__)


@rank_routes.route("/<int:plid>/edit", methods=["PATCH"])
def edit_rank(plid):
    """Edit a rank."""
    form = RankForm()
    form["csrf_token"].data = request.cookies["csrf_token"]
    
    if form.validate_on_submit():
        rank = Rank.query.get(plid)
        rank.title = form["title"].data
        rank.description = form["description"].data
        # rank.color = form["color"].data
        # rank.image = form["image"].data
        db.session.commit()
        return rank.to_dict()
    else:
        return {"errors": validation_errors_to_messages(form.errors)}, 401


@rank_routes.route("/<int:plid>/delete", methods=["DELETE"])
def delete_rank(plid):
    """Delete a rank and all its dependents"""
    rank = Rank.query.get(plid)
    db.session.delete(rank)
    db.session.commit()
    return "Deleted that lil' rank for you ;M"