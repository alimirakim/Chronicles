from flask import Blueprint, jsonify, session, request
from flask_login import current_user, login_user, logout_user, login_required
from app.models import db, User, Chronicle, Tale
from app.forms import LoginForm, SignUpForm
from app.utils import validation_errors_to_messages
from pprint import pprint

auth_routes = Blueprint('auth', __name__)


@auth_routes.route('/')
def authenticate():
    """Authenticates a user."""
    if current_user.is_authenticated:
        chronicles = Chronicle.query \
            .filter(Chronicle.user_id == current_user.id) \
            .options(db.joinedload(Chronicle.tales).joinedload(Tale.threads)) \
            .all()
            
        # Normalize data before returning
        tales = {}
        threads = {}
        for chronicle in chronicles:
            for tale in chronicle.tales:
                tales[tale.id] = tale.to_dict()
                for thread in tale.threads:
                    threads[thread.id] = thread.to_dict()
                    
        chronicles = {chronicle.id:chronicle.to_dict() for chronicle in chronicles}
        return jsonify(user=current_user.to_dict(), chronicles=chronicles, tales=tales, threads=threads)
    return {'errors': ['Unauthorized']}, 401


@auth_routes.route('/login', methods=['POST'])
def login():
    """Logs a user in"""
    print("\nPRINT: request.get_json()", request.get_json())
    form = LoginForm()
    # Get the csrf_token from the request cookie and put it into the
    # form manually to validate_on_submit can be used
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        # Add the user to the session, we are logged in!
        user = User.query.filter(User.email == form.data['email']).first()
        # Query User's chronicles, tales, threads
        chronicles = Chronicle.query \
            .filter(Chronicle.user_id == user.id) \
            .options(db.joinedload(Chronicle.tales).joinedload(Tale.threads)) \
            .all()
            
        # Normalize data before returning
        print("\nABOUT TO NORMALIZE...")
        print("\nNORMALIZED CHRONICLES", chronicles)
        tales = {}
        threads = {}
        for chronicle in chronicles:
            for tale in chronicle.tales:
                tales[tale.id] = tale.to_dict()
                for thread in tale.threads:
                    threads[thread.id] = thread.to_dict()
        
        chronicles = {chronicle.id:chronicle.to_dict() for chronicle in chronicles}
        # Print results of final, clean data
        print("\n\nUSER, CHRONICLES, TALES, THREADS")
        pprint(user)
        pprint(chronicles)
        pprint(tales)
        pprint(threads)
        
        login_user(user)
        return jsonify(user=user.to_dict(), chronicles=chronicles, tales=tales, threads=threads)
    return {'errors': validation_errors_to_messages(form.errors)}, 401


@auth_routes.route('/logout')
def logout():
    """Logs a user out"""
    logout_user()
    return {'message': 'User logged out'}


@auth_routes.route('/signup', methods=['POST'])
def sign_up():
    """Creates a new user and logs them in"""
    form = SignUpForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        user = User(
            username=form.data['username'],
            email=form.data['email'],
            password=form.data['password'])
        chronicle = Chronicle(
            user=user,
            title=f"{user.username}'s Chronicles",
            description="Record the details of your story in this Chronicle, including characters, items, locations, and events. Start new Tales and weave them together by making and connecting Threads.")
        tale = Tale(
            chronicle=chronicle,
            title=f"{user.username}'s First Tale",
            description="Start your very first Tale here. Make a Thread, then add more and start weaving them together.")

        db.session.add(user)
        db.session.add(chronicle)
        db.session.add(tale)

        db.session.commit()
        login_user(user)
        
        chronicles = {chronicle.id: chronicle.to_dict()}
        tales = {tale.id: tale.to_dict()}
        
        print("\n\nSIGNED UP: USER CHRONICLES TALES")
        pprint(user)
        pprint(chronicles)
        pprint(tales)
        
        return jsonify(user=user.to_dict(), chronicles=chronicles, tales=tales)
    return {'errors': validation_errors_to_messages(form.errors)}


@auth_routes.route('/unauthorized')
def unauthorized():
    """Returns unauthorized JSON when flask-login authentication fails"""
    return {'errors': ['Unauthorized']}, 401
