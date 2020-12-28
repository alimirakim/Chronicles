from flask import Blueprint, jsonify, request
from app.models import db, Thread, Choice
from app.forms import ThreadForm
from app.utils import validation_errors_to_messages, createChoices
from pprint import pprint

thread_routes = Blueprint("threads", __name__)


@thread_routes.route("/<int:thid>/edit", methods=["PATCH"])
def edit_thread(thid):
    """Edit a thread."""
    form = ThreadForm()
    form["csrf_token"].data = request.cookies["csrf_token"]
    if form.validate_on_submit():
        thread = Thread.query.get(thid)
        thread.title = form["title"].data
        thread.description = form["description"].data
        thread.color = form["color"].data
        thread.icon = form["icon"].data
        thread.image = form["image"].data
        
        # updating choices
        existing_choices = Choice.query.filter(Choice.current_thread_id == thread.id).all()
        existing_choice_ids = [c.id for c in existing_choices]
        editted_choice_ids = [c.id for c in request.json["choices"]]
        
        for choice in existing_choices:
            print("\n\nDELETE", choice)
            if choice.id not in editted_choice_ids:
                # deleting removed choices
                db.session.delete(choice)
            else:
                print("\n\nUPDATE", choice)
                # updating existing choices
                [matching_choice] = [c for c in request.json["choices"] if c["id"] and c["id"] == choice.id]
                choice.title = matching_choice["title"]
                choice.color = matching_choice["color"]
                choice.icon = matching_choice["icon"]
                choice.image = matching_choice["image"]
                request.json["choices"].remove(matching_choice)
        # adding new choices
        choices = createChoices(request.json["choices"], thread)
        print("\n\nCHOICES?", choices)
        db.session.commit()
        return jsonify(thread=thread.to_dict(), choices=choices)
    else:
        return {"errors": validation_errors_to_messages(form.errors)}, 401
      

@thread_routes.route("/<int:thid>/delete", methods=["DELETE"])
def delete_thread(thid):
    """Delete a thread and its dependents like effects, locks."""
    thread = Thread.query.get(thid)
    db.session.delete(thread)
    db.session.commit()
    return "Oh my, that thread was snipped! :0"
    

@thread_routes.route("/<int:thid>/create", methods=["POST"])
def create_choice(thid):
    """Create a choice."""
    form = ThreadForm()
    form["csrf_token"].data = request.cookies["csrf_token"]
    
    if form.validate_on_submit():
        choice = Choice(
            title=form["title"].data,
            prev_thread_id=form["prev_thread"].data,
            next_thread_id=form["next_thread"].data,
            color=form["color"].data,
            icon=form["icon"].data,
            image=form["image"].data,
        )
        db.session.add(choice)
        db.session.commit()
        return choice.to_dict()
    else:
        return {"errors": validation_errors_to_messages(form.errors)}, 401


@thread_routes.route("/<int:chid>/edit", methods=["PATCH"])
def edit_choice(chid):
    """Edit a choice."""
    form = ThreadForm()
    form["csrf_token"].data = request.cookies["csrf_token"]
    
    if form.validate_on_submit():
        choice = Choice.query.get(chid)
        choice.title = form["title"].data
        choice.prev_thread_id = form["prev_thread"].data
        choice.next_thread_id = form["next_thread"].data
        choice.color = form["color"].data
        choice.icon = form["icon"].data
        choice.image = form["image"].data
        db.session.commit()
        return choice.to_dict()
    else:
        return {"errors": validation_errors_to_messages(form.errors)}, 401


@thread_routes.route("/<int:chid>/delete", methods=["DELETE"])
def delete_choice(thid):
    """Delete a choice and its dependents like locks."""
    choice = Choice.query.get(thid)
    db.session.delete(choice)
    db.session.commit()
    return "Oh my, that choice was snipped! :0"