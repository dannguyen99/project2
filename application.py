import os
import flask

from flask import Flask, render_template, redirect, request, session
#from flask_socketio import SocketIO, emit
from models import *

app = Flask(__name__)
app.config["SECRET_KEY"] = os.getenv("SECRET_KEY")
app.config["SQLALCHEMY_DATABASE_URI"] = os.getenv("DATABASE_URL")
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
db.init_app(app)
#socketio = SocketIO(app)

channels = []

@app.route("/", methods = ["GET", "POST"])
def index():
    if request.method == "POST":
        username = request.form.get('username')
        password = request.form.get('password')
        if User.query.filter_by(username = username, password = password).first() != None:
            return redirect("/channels")
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
            db.session.commit()
            return redirect("/")
    else:
        return render_template("register.html")

@app.route("/channels", methods = ["GET", "POST"])
def channels():
    if request.method == "POST":
        name = request.form.get('name')
        password = request.form.get('password')
        desc = request.form.get('desciption')
        c = Channels(name, password, desc)
        channels.append(c)
        return jsonify({"success": True, "rate":c})
    else:
        return render_template("channels.html")
