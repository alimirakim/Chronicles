from flask import Blueprint, jsonify, session, request
from flask_login import current_user, login_user, logout_user, login_required
from pprint import pprint
from app.models import db, User, Chronicle, Tale, Thread
from app.forms import LoginForm, SignUpForm
from app.utils import validation_errors_to_messages, get_and_normalize_all_data_for_user, normalize_user_data

auth_routes = Blueprint('auth', __name__)


@auth_routes.route('/')
def authenticate():
    """Authenticates a user."""
    if current_user.is_authenticated:
        user, chronicles, tales, threads, choices, characters, places, assets, conditions, meters = get_and_normalize_all_data_for_user(current_user)
        print("\n\nWhat wrong??")


        pprint(characters)

   
        return jsonify(
            user=user, 
            chronicles=chronicles, 
            tales=tales, 
            threads=threads, 
            choices=choices,
            characters=characters,
            places=places,
            assets=assets,
            conditions=conditions,
            meters=meters,
            )
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
        login_user(user)
        
        user, chronicles, tales, threads, choices, characters, places, assets, conditions, meters = get_and_normalize_all_data_for_user(user)
        return jsonify(
            user=user, 
            chronicles=chronicles, 
            tales=tales, 
            threads=threads, 
            choices=choices,
            characters=characters,
            places=places,
            assets=assets,
            conditions=conditions,
            meters=meters,)
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
        # TODO Idea: Populate an entire sample demo for new users?
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
        thread = Thread(
            tale=tale,
            title="Start Here!")
        
        db.session.add(user)
        db.session.add(chronicle)
        db.session.add(tale)
        db.session.add(thread)
        db.session.commit()
        
        tale.first_thread_id = thread.id
        db.session.commit()
        
        login_user(user)
        
        norm_user = normalize_user_data(user)
        
        return jsonify(user=norm_user, chronicles=chronicles, tales=tales, threads=threads)
    return {'errors': validation_errors_to_messages(form.errors)}


@auth_routes.route('/unauthorized')
def unauthorized():
    """Returns unauthorized JSON when flask-login authentication fails"""
    return {'errors': ['Unauthorized']}, 401
