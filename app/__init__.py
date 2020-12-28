import os
from flask import Flask, render_template, request, session, redirect
from werkzeug.utils import secure_filename

from flask_cors import CORS
from flask_migrate import Migrate
from flask_wtf.csrf import CSRFProtect, generate_csrf
from flask_login import LoginManager

from .models import db, User
from .api.auth_routes import auth_routes
from .api.chronicle_routes import chronicle_routes
from .api.lock_routes import lock_routes
from .api.effect_routes import effect_routes
from .api.entity_routes import entity_routes
from .api.meter_routes import meter_routes
from .api.tale_routes import tale_routes
from .api.thread_routes import thread_routes
from .api.user_routes import user_routes

from .seeds import seed_commands
from .config import Config
from .utils import upload_file_to_s3

ALLOWED_EXTENSIONS = {'txt', 'pdf', 'png', 'jpg', 'jpeg', 'gif'}
def allowed_file(filename):
    return '.' in filename and \
           filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS


def create_app(config):
    """Create the app, register routes and db, etc."""
    app = Flask(__name__)

    # Setup login manager
    login = LoginManager(app)
    login.login_view = 'auth.unauthorized'

    @login.user_loader
    def load_user(id):
        return User.query.get(int(id))

    # Tell flask about our seed commands
    app.cli.add_command(seed_commands)

    app.config.from_object(config)

    app.register_blueprint(auth_routes, url_prefix='/api/auth')
    app.register_blueprint(chronicle_routes, url_prefix="/api/chronicles")
    app.register_blueprint(effect_routes, url_prefix="/api/effects")
    app.register_blueprint(entity_routes, url_prefix="/api/entities")
    app.register_blueprint(lock_routes, url_prefix="/api/locks")
    app.register_blueprint(meter_routes, url_prefix="/api/meters")
    app.register_blueprint(tale_routes, url_prefix="/api/tales")
    app.register_blueprint(thread_routes, url_prefix="/api/threads")
    app.register_blueprint(user_routes, url_prefix='/api/users')
    # app.register_blueprint(_routes, url_prefix="/api/")
    db.init_app(app)
    Migrate(app, db)

    # Application Security
    CORS(app)

    # @app.before_request
    # def redirect_https():
    #   if request.headers.get('X-Forwarded-Proto') == 'http':
    #     url = request.url.replace('http://', 'https://', 1)
    #     code = 301
    #     return redirect(url, code=code)

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


    @app.route("/upload", methods=["POST"])
    def upload_file():
        """Uploads user file to AWS."""
        

        # Check for a user_file. If absent, return error message.
        # user_file is the name of the file input on the form.
        if "user_file" not in request.files:
            return "No user_file key in request.files"

        # If the key is in the request.files object, save in 'file' variable.
        file = request.files["user_file"]
        # These attributes are also available:
        #     file.filename
        #     file.content_type
        #     file.content_length
        #     file.mimetype

        # Check filename attribute on the object
        # If empty, return error message; the user submitted an empty form.
        if file.filename == "":
            return "Please select a file"

        print("\n\nUPLOADING IMAGE? req", file.filename)
        # Check that there is a file and that it has an allowed filetype 
        # (allowed_file function does this, see more in Flask docs).
        if file and allowed_file(file.filename):
            file.filename = secure_filename(file.filename)
            output = upload_file_to_s3(file, app.config["S3_BUCKET"])
            print("\n\nOUTPUT", output)
            return str(output)

        else:
            return redirect("/")

    return app

app = create_app(Config)
