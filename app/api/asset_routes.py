from flask import Blueprint, jsonify, request
from flask_login import current_user
from app.models import db, Asset
from app.utils import validation_errors_to_messages
from app.forms import AssetForm


asset_routes = Blueprint("assets", __name__)

@asset_routes.route("/<int:tid>/edit", methods=["PATCH"])
def edit_asset(tid):
    """Edit an asset."""
    form = AssetForm()
    form["csrf_token"].data = request.cookies["csrf_token"]
    
    if form.validate_on_submit():
        asset = Asset.query.get(tid)
        asset.title = form["title"].data
        asset.description = form["description"].data
        # asset.color = form["color"].data
        # asset.image = form["image"].data
        db.session.commit()
        return asset.to_dict()
    else:
        return {"errors": validation_errors_to_messages(form.errors)}, 401


@asset_routes.route("/<int:tid>/delete", methods=["DELETE"])
def delete_asset(tid):
    """Delete an asset and all its dependents like effects, locks joins..."""
    asset = Asset.query.get(tid)
    db.session.delete(asset)
    db.session.commit()
    return "Deleted that lil' asset for you ;M"