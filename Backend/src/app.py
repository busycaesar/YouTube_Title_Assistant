from flask import Flask
from env_variables import port
from routes import routes
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

app.register_blueprint(routes, url_prefix="/")

if __name__ == "__main__":
    
    if port:
        app.run(host="0.0.0.0", debug=True, port=port)