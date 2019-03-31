import os
import flask

from flask import Flask, render_template, redirect
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
    if flask.request.method == "POST":
        username = request.form.get('username')
        password = request.form.get('password')
        if User.query.filter_by(username = username, password = password).count == 1:
            return redirect("/register")
        else:
            return redirect("/", message = User.query.filter_by(username = username, password = password).count == 1)
    else:
        return render_template("index.html")

@app.route("/register")
def register():
    return render_template("register.html")