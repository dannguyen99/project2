import os

from flask import Flask, render_template
#from flask_socketio import SocketIO, emit
from models import *

app = Flask(__name__)
app.config["SECRET_KEY"] = os.getenv("SECRET_KEY")
app.config["SQLALCHEMY_DATABASE_URI"] = os.getenv("DATABASE_URL")
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
db.init_app(app)
#socketio = SocketIO(app)


@app.route("/", methods = ["GET", "POST"])
def index():
    if method == "POST":

    return render_template("index.html")

@app.route("/register")
def register():
    return render_template("register.html")