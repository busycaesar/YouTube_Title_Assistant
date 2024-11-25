from flask import Flask
from env_variables import port
from routes import routes

app = Flask(__name__)

app.register_blueprint(routes, url_prefix="/")

if __name__ == "__main__":
    
    if port:
        app.run(host="0.0.0.0", debug=True, port=port)