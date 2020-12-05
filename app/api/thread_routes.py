from flask import Blueprint, jsonify, request
from app.models import db, Thread
from app.forms import ThreadForm
from app.utils import validation_errors_to_messages

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
        db.session.commit()
    else:
        return {"errors": validation_errors_to_messages}
      

@thread_routes.route("/<int:thid>/delete", methods=["DELETE"])
def delete_thread(thid):
    """Delete a thread and its dependents like effects, locks."""
    thread = Thread.query.get(thid)
    db.session.delete(thread)
    db.session.commit()
    return "Oh my, that thread was snipped! :0"