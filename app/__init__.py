import os
from flask import Flask, render_template, request, session
from flask_cors import CORS
from flask_migrate import Migrate
from flask_wtf.csrf import CSRFProtect, generate_csrf
from flask_login import LoginManager

from .models import db, User
from .api.asset_routes import asset_routes
from .api.auth_routes import auth_routes
from .api.character_routes import character_routes
from .api.chronicle_routes import chronicle_routes
from .api.place_routes import place_routes
from .api.tale_routes import tale_routes
from .api.thread_routes import thread_routes
from .api.user_routes import user_routes

from .seeds import seed_commands

from .config import Config

app = Flask(__name__)

# Setup login manager
login = LoginManager(app)
login.login_view = 'auth.unauthorized'


@login.user_loader
def load_user(id):
    return User.query.get(int(id))


# Tell flask about our seed commands
app.cli.add_command(seed_commands)

app.config.from_object(Config)
app.register_blueprint(asset_routes, url_prefix="/api/assets")
app.register_blueprint(auth_routes, url_prefix='/api/auth')
app.register_blueprint(character_routes, url_prefix="/api/characters")
app.register_blueprint(chronicle_routes, url_prefix="/api/chronicles")
app.register_blueprint(place_routes, url_prefix="/api/places")
app.register_blueprint(tale_routes, url_prefix="/api/tales")
app.register_blueprint(thread_routes, url_prefix="/api/threads")
app.register_blueprint(user_routes, url_prefix='/api/users')
# app.register_blueprint(_routes, url_prefix="/api/")
db.init_app(app)
Migrate(app, db)

# Application Security
CORS(app)


@app.after_request
def inject_csrf_token(response):
    response.set_cookie('csrf_token',
                        generate_csrf(),
                        secure=True if os.environ.get(
                            'FLASK_ENV') == 'production' else False,
                        samesite='Strict' if os.environ.get(
                            'FLASK_ENV') == 'production' else None,
                        httponly=True)
    return response


@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def react_root(path):
    print("path", path)
    if path == 'favicon.ico':
        return app.send_static_file('favicon.ico')
    return app.send_static_file('index.html')