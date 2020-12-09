from flask import Blueprint, jsonify, request
from flask_login import current_user
from app.models import db, Chronicle, Tale, Thread, ThreadChoice, Entity, Character, Place, Asset, Condition, Rank
from app.utils import validation_errors_to_messages
from app.forms import ChronicleForm, TaleForm, CharacterForm, PlaceForm, AssetForm, ConditionForm, RankForm

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
            description=form["description"].data
            # color=form["color"].data
            # image=form["image"].data
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
        # chronicle.color = form["color"].data
        # chronicle.image = form["image"].data
        db.session.commit()
        return chronicle.to_dict()
    else:
        return {"errors": validation_errors_to_messages(form.errors)}, 401


@chronicle_routes.route("/<int:cid>/delete", methods=["DELETE"])
def delete_chronicle(cid):
    """Delete a chronicle and all its dependents like characters, places, assets, tales, threads, etc."""
    chronicle = Chronicle.query.get(cid)
    db.session.delete(chronicle)
    db.session.commit()
    return "Chronicle successfully deleted! ;B"


# Creation routes for Tales, Characters, Places, Assets, Conditions, Ranks...
@chronicle_routes.route("/<int:cid>/tales/create", methods=["POST"])
def create_tale(cid):
    """Create a new tale that belongs to a chronicle"""
    form = TaleForm()
    form["csrf_token"].data = request.cookies["csrf_token"]
    
    if form.validate_on_submit():
        tale = Tale(
            chronicle_id=cid,
            title=form["title"].data,
            description=form["description"].data
            # color=form["color"].data
            # image=form["image"].data
            )
        db.session.add(tale)
        db.session.commit()
        return tale.to_dict()
    else:
        return {"errors": validation_errors_to_messages(form.errors)}, 401


# Create character entity
@chronicle_routes.route("/<int:cid>/characters/create", methods=["POST"])
def create_character(cid):
    """Create a new character that belongs to a chronicle"""
    form = CharacterForm()
    form["csrf_token"].data = request.cookies["csrf_token"]
    
    if form.validate_on_submit():
        entity = Entity(
            chronicle_id=cid,
            type="character",
            title=form["title"].data,
            description=form["description"].data,
            # color=form["color"].data,
            # image=form["image"].data,
            )
        character = Character(
            entity=entity,
            user=current_user,
        )
        # TODO Option to add character assets, ranks, conditions?
        db.session.add(character)
        db.session.commit()
        return character.to_dict()
    else:
        return {"errors": validation_errors_to_messages(form.errors)}, 401


# Create place entity
@chronicle_routes.route("/<int:cid>/places/create", methods=["POST"])
def create_place(cid):
    """Create a new place that belongs to a chronicle"""
    form = PlaceForm()
    form["csrf_token"].data = request.cookies["csrf_token"]
    
    if form.validate_on_submit():
        entity = Entity(
            chronicle_id=cid,
            type="place",
            title=form["title"].data,
            description=form["description"].data,
            # color=form["color"].data,
            # image=form["image"].data,
            )
        place = Place(
            entity=entity
        )
        db.session.add(place)
        db.session.commit()
        return place.to_dict()
    else:
        return {"errors": validation_errors_to_messages(form.errors)}, 401


# Create asset entity
@chronicle_routes.route("/<int:cid>/assets/create", methods=["POST"])
def create_asset(cid):
    """Create a new asset entity that belongs to a chronicle"""
    form = AssetForm()
    form["csrf_token"].data = request.cookies["csrf_token"]
    
    if form.validate_on_submit():
        entity = Entity(
            chronicle_id=cid,
            type="asset",
            title=form["title"].data,
            description=form["description"].data,
            # color=form["color"].data,
            # image=form["image"].data,
            )
        asset = Asset(
            entity=entity,
            type=form["type"].data,
            is_unique=form["is_unique"].data,
        )
        db.session.add(asset)
        db.session.commit()
        return asset.to_dict()
    else:
        return {"errors": validation_errors_to_messages(form.errors)}, 401


# Create a type of boolean-like, optionally time-limited condition
@chronicle_routes.route("/<int:cid>/conditions/create", methods=["POST"])
def create_condition(cid):
    """Create a new condition that belongs to a chronicle"""
    form = ConditionForm()
    form["csrf_token"].data = request.cookies["csrf_token"]
    
    if form.validate_on_submit():
        condition = Condition(
            chronicle_id=cid,
            title=form["title"].data,
            description=form["description"].data,
            # color=form["color"].data,
            # image=form["image"].data,
            )
        db.session.add(condition)
        db.session.commit()
        return condition.to_dict()
    else:
        return {"errors": validation_errors_to_messages(form.errors)}, 401


# Create a type of progressable rank, like 'levels' or 'skills'
@chronicle_routes.route("/<int:cid>/ranks/create", methods=["POST"])
def create_rank(cid):
    """Create a new rank that belongs to a chronicle"""
    form = RankForm()
    form["csrf_token"].data = request.cookies["csrf_token"]
    
    if form.validate_on_submit():
        rank = Rank(
            chronicle_id=cid,
            title=form["title"].data,
            description=form["description"].data,
            # color=form["color"].data,
            # image=form["image"].data,
            )
        db.session.add(rank)
        db.session.commit()
        return rank.to_dict()
    else:
        return {"errors": validation_errors_to_messages(form.errors)}, 401
