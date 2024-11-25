from flask import Blueprint, jsonify
from .title import title_api
from .response import response

# Initiate a routes blueprint to add all the routes.
routes = Blueprint("routes", __name__)

# Add a health check route.
@routes.route("/", methods=["GET"])
def health_check():
    return jsonify(response(True, "App is healthy.")), 200

# Add title route.
routes.register_blueprint(title_api, url_prefix="/api/title")