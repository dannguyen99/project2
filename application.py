import os
import flask

from flask import Flask, render_template, redirect, request
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
    if request.method == "POST":
        username = request.form.get('username')
        password = request.form.get('password')
        if User.query.filter_by(username = username, password = password).first() != None:
            return redirect("/register")
        else:
            return redirect("/")
    else:
        return render_template("index.html")

@app.route("/register", methods = ["GET", "POST"])
def register():
    if request.method == "POST":
        username = request.form.get('username')
        password = request.form.get('password')
        if " " in username or " " in password or len(username) == 0:
            return redirect("/register")
        elif User.query.filter_by(username = username).first() != None:
            return redirect("/register")
        else:
            u = User(username = username, password = password)
            db.session.add(u)
            redirect("/")
    else:
        return render_template("register.html")
