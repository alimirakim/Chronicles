from flask import Blueprint, jsonify, request
from flask_login import current_user
from app.models import db, Asset
from app.utils import validation_errors_to_messages
from app.forms import AssetForm


asset_routes = Blueprint("assets", __name__)


# @asset_routes("/")



# @asset_routes("/")



# @asset_routes("/")



# @asset_routes("/")



# @asset_routes("/")
