from flask import Blueprint, jsonify, request
from app.models import db, Tale, Thread, ThreadChoice
from app.forms import TaleForm, ThreadForm
from app.utils import validation_errors_to_messages


tale_routes = Blueprint("tales", __name__)


@tale_routes.route("/<int:tid>/edit", methods=["PATCH"])
def edit_tale(tid):
    """Edit a tale."""
    form = TaleForm()
    form["csrf_token"].data = request.cookies["csrf_token"]
    
    if form.validate_on_submit():
        tale = Tale.query.get(tid)
        tale.title = form["title"].data,
        tale.description = form["description"].data
        db.session.commit()
        return jsonify({tale.id: tale.to_dict()})
    else:
        return {"errors": validation_errors_to_messages(form.errors)}, 401


@tale_routes.route("/<int:tid>/delete", methods=["DELETE"])
def delete_tale(tid):
    """Delete a tale and all its dependents like threads, effects, locks"""
    tale = Tale.query.get(tid)
    db.session.delete()
    db.session.commit()
    return "Deleted that lil' tale for you ;M"


@tale_routes.route("/<int:tid>/threads/create", methods=["POST"])
def create_thread(tid):
    """Create a new thread."""
    form = ThreadForm()
    form["csrf_token"].data = request.cookies["csrf_token"]
    print("\n\nCREATING THREAD...")
    
    if form.validate_on_submit():
        print("\n\nCREATING NEW THREAD")
        thread = Thread(
            tale_id=tid,
            title=form["title"].data,
            description=form["description"].data,)
        db.session.add(thread)
        
        # Create choices that new thread connects to
        choices = []
        
        req_choices = [int(choice) for choice in request.json["choices"]]
        queried_threads = Thread.query.filter(Thread.id.in_(req_choices)).all()
        
        for choice in req_choices:
            # TODO Check if 'choices' is object so as to grab alt title.
            [queried_thread] = [qt for qt in queried_threads if qt.id == choice]
            thread_choice = ThreadChoice(
                title= f"Continue to: {queried_thread.title}",
                current_thread=thread,
                choice_thread_id=choice)
            db.session.add(thread_choice)
            choices.append({thread_choice.id: thread_choice.to_dict()})
        db.session.commit()
        print("\n\nNEW THREAD", thread.to_dict())
        return jsonify(thread=thread.to_dict(), choices=choices)
    else:
        {"error": validation_errors_to_messages(form.errors)}, 401