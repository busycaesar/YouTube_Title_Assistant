from flask import Blueprint, request, jsonify
from .response import response
from llm import get_title_suggestions, get_keywords_suggestions, get_description

title_api = Blueprint("title_api", __name__)

@title_api.route("/", methods=["POST"])
def api_post_title():
    # Get all the data from request body.
    data = request.get_json()

    # Get the link of the youtube video.
    video_link = data.get("video_link")

    # Get the API Keys.
    gemini_api_keys = data.get("gemini_api_keys")

    if not video_link:
        return jsonify(response(False, "Video's link is not provided.")), 400
    
    try:
        title_suggestions = get_title_suggestions(video_link, gemini_api_keys)

        keywords_suggestions = get_keywords_suggestions(video_link, gemini_api_keys)

        description_suggestion = get_description(video_link, gemini_api_keys)

        return jsonify(response(True, "Sent suggestions for title", 
                                {"title": title_suggestions, 
                                 "keywords": keywords_suggestions, 
                                 "description": description_suggestion })), 200
    
    except Exception as e:
        return jsonify(response(False, f"Error: {str(e)}")), 500