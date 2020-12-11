from flask import Blueprint, jsonify, request
from flask_login import current_user
from app.models import db, Chronicle, Tale, Thread, ThreadChoice, Entity, Meter
from app.utils import validation_errors_to_messages
from app.forms import ChronicleForm, TaleForm, EntityForm, MeterForm

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
            description=form["description"].data,
            color=form["color"].data,
            image=form["image"].data,
            )
        tale = Tale(
            chronicle=chronicle,
            title=f"{chronicle.title}'s First Tale")
        thread = Thread(
            tale=tale,
            title=f"Start Here!",
            description="Edit this scene and link threads with choices!")
        db.session.add(chronicle)
        # db.session.add(tale)
        # db.session.add(thread)
        db.session.commit()
        return chronicle.to_dict()
            # chronicle={chronicle.id: chronicle.to_dict()}, 
            # tale={tale.id: tale.to_dict()}, 
            # thread={thread.id: thread.to_dict()}
        
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
        chronicle.color = form["color"].data
        chronicle.image = form["image"].data
        db.session.commit()
        return chronicle.to_dict()
    else:
        return {"errors": validation_errors_to_messages(form.errors)}, 401


@chronicle_routes.route("/<int:cid>/delete", methods=["DELETE"])
def delete_chronicle(cid):
    """Delete a chronicle and all its dependents like entities, tales, etc."""
    chronicle = Chronicle.query.get(cid)
    db.session.delete(chronicle)
    db.session.commit()
    return "Chronicle successfully deleted! ;B"


# Creation routes for Tales, Characters, Places, Assets, Conditions, Meters...
@chronicle_routes.route("/<int:cid>/tales/create", methods=["POST"])
def create_tale(cid):
    """Create a new tale that belongs to a chronicle"""
    form = TaleForm()
    form["csrf_token"].data = request.cookies["csrf_token"]
    
    if form.validate_on_submit():
        tale = Tale(
            chronicle_id=cid,
            title=form["title"].data,
            description=form["description"].data,
            color=form["color"].data,
            image=form["image"].data,
            )
        db.session.add(tale)
        db.session.commit()
        return tale.to_dict()
    else:
        return {"errors": validation_errors_to_messages(form.errors)}, 401


# Create entity
@chronicle_routes.route("/<int:cid>/<entity>/create", methods=["POST"])
def create_entity(cid, entity):
    """Create a new entity that belongs to a chronicle"""
    form = EntityForm()
    form["csrf_token"].data = request.cookies["csrf_token"]
    
    if form.validate_on_submit():
        entity = Entity(
            chronicle_id=cid,
            type=entity,
            subtype=form["subtype"].data,
            title=form["title"].data,
            description=form["description"].data,
            is_unique=form["is_unique"].data,
            color=form["color"].data,
            image=form["image"].data,
            )

        # TODO Option to add entity assets, meters, conditions?
        db.session.add(entity)
        db.session.commit()
        return entity.to_dict()
    else:
        return {"errors": validation_errors_to_messages(form.errors)}, 401


# Create a type of progressable meter, like 'levels' or 'skills'
# @chronicle_routes.route("/<int:cid>/meters/create", methods=["POST"])
# def create_meter(cid):
#     """Create a new meter that belongs to a chronicle"""
#     form = MeterForm()
#     form["csrf_token"].data = request.cookies["csrf_token"]

#     if form.validate_on_submit():
#         meter = Meter(
#             chronicle_id=cid,
#             title=form["title"].data,
#             description=form["description"].data,
#             color=form["color"].data,
#             image=form["image"].data,
#             )
#         db.session.add(meter)
#         db.session.commit()
#         return meter.to_dict()
#     else:
#         return {"errors": validation_errors_to_messages(form.errors)}, 401
