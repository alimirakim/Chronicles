from flask import Blueprint, jsonify, request
from app.models import db, Thread, ThreadChoice
from app.forms import ThreadForm
from app.utils import validation_errors_to_messages, createChoices
from app.forms import ThreadForm


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
        # thread.color = form["color"].data
        # thread.image = form["image"].data
        
        # TODO This is a messy mid-WIP slop for fixing up later!
        # Updating choices to delete removed choices, add new choices, and edit
        # existing choices.
        existing_choices = ThreadChoice.query.filter(ThreadChoice.current_thread_id == thread.id).all()
        existing_choice_ids = [c.id for c in existing_choices]
        
        for choice in existing_choices:
            # Deleting removed choices
            if choice.id not in request.json["choices"]:
                db.session.delete(choice) 
            # updating existing choices
            else:
                [matching_choice] = [c for c in request.json["choices"] if c["id"] and c["id"] == choice.id]
                choice.title = matching_choice["title"]
                # choice.color = matching_choice["color"]
                # choice.image = matching_choice["image"]
                request.json["choices"].remove(matching_choice)
        # Adding choices that are new
        choices = createChoices(request.json["choices"], thread)
        print("\n\nCHOICES?", choices)
        db.session.commit()
        return jsonify(thread=thread.to_dict(), choices=choices)
    else:
        return {"errors": validation_errors_to_messages}
      

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
    form = ChoiceForm()
    form["csrf_token"].data = request.cookies["csrf_token"]
    
    if form.validate_on_submit():
        choice = ThreadChoice(
            title=form["title"].data,
            current_thread_id=form["current_thread"].data,
            choice_thread_id=form["choice_thread"].data,
            # color: form["color"].data,
            # image: form["image"].data,
        )
        db.session.add(choice)
        db.session.commit()
        return choice.to_dict()
    else:
        return {"errors": validation_errors_to_messages}


# @choice_routes.route("/<int:chid>/edit", methods=["PATCH"])
# def edit_choice(chid):
#     """Edit a choice."""
#     form = ThreadForm()
#     form["csrf_token"].data = request.cookies["csrf_token"]
    
#     if form.validate_on_submit():
#         choice = Choice.query.get(chid)
#         choice.title = form["title"].data
#         choice.current_thread_id = form["current_thread"].data
#         choice.choice_thread_id = form["choice_thread"].data
#         db.session.commit()
#     else:
#         return {"errors": validation_errors_to_messages}


# @choice_routes.route("/<int:chid>/delete", methods=["DELETE"])
# def delete_thread(thid):
#     """Delete a choice and its dependents like effects, locks."""
#     choice = Choice.query.get(thid)
#     db.session.delete(choice)
#     db.session.commit()
#     return "Oh my, that choice was snipped! :0"