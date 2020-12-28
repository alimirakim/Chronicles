from flask import Blueprint, jsonify, request
from flask_login import current_user
from app.models import db, Entity
from app.utils import validation_errors_to_messages
from app.forms import EntityForm

entity_routes = Blueprint("entities", __name__)

# Create entity
@entity_routes.route("/<int:cid>/<entity>/create", methods=["POST"])
def create_entity(cid, entity):
    """Create a new entity that belongs to a chronicle"""
    form = EntityForm()
    form["csrf_token"].data = request.cookies["csrf_token"]
    
    if form.validate_on_submit():
        entity = Entity(
            user=current_user,
            type=form["type"].data,
            category=form["category"].data,
            title=form["title"].data,
            description=form["description"].data,
            color=form["color"].data,
            icon=form["icon"].data,
            image=form["image"].data,
            )
        
        # TODO Option to add entity assets, meters, conditions?
        db.session.add(entity)
        db.session.commit()
        return entity.to_dict()
    else:
        return {"errors": validation_errors_to_messages(form.errors)}, 401


@entity_routes.route("/<int:tid>/edit", methods=["PATCH"])
def edit_entity(tid):
    """Edit an entity."""
    form = EntityForm()
    form["csrf_token"].data = request.cookies["csrf_token"]
    
    if form.validate_on_submit():
        entity = Entity.query.get(tid)
        entity.type = form["type"].data,
        entity.category = form["category"].data,
        entity.title = form["title"].data
        entity.description = form["description"].data
        entity.color = form["color"].data
        entity.icon = form["icon"].data
        entity.image = form["image"].data
        db.session.commit()
        return entity.to_dict()
    else:
        return {"errors": validation_errors_to_messages(form.errors)}, 401


@entity_routes.route("/<int:tid>/delete", methods=["DELETE"])
def delete_entity(tid):
    """Delete an entity and all its dependents like effects, locks joins..."""
    entity = Entity.query.get(tid)
    db.session.delete(entity)
    db.session.commit()
    return "Deleted that lil' entity for you ;M"