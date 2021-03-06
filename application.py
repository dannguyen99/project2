import os

import requests
from flask import Flask, render_template, redirect, request, session, jsonify
from flask_socketio import SocketIO, emit

from models import *

app = Flask(__name__)
app.config["SECRET_KEY"] = os.getenv("SECRET_KEY")
app.config["SQLALCHEMY_DATABASE_URI"] = os.getenv("DATABASE_URL")
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
app.config['DEBUG'] = False
db.init_app(app)
socketio = SocketIO(app)

channels_list = []

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
        name = request.form.get("name")
        password = request.form.get("password")
        desc = request.form.get("description")
        if channel_check(channels_list, name):
            c = Channel(name, password, desc)
            channels_list.append(c)
        else:
            return jsonify({"success":False})
        return jsonify({"success": True, "name":name, "desc":desc})
    else:
        return render_template("channels.html", chat_channels = channels_list)

@app.route("/channels/<string:channel_name>")
def channel(channel_name):
    if channel_check(channels_list, channel_name):
        return "Error: Invalid channel name"
    else:
        for i in channels_list:
            if i.name == channel_name:
                return render_template("channel.html",this_channel = i, length = len(i.message))

@socketio.on("submit message")
def send(data):
    m = Message(data["user"],data["mess"])
    a = addMessage(channels_list, data['title'], m)
    emit("announce message", {"mess": m.chat, "user":m.username, "time":str(m.time.hour) +":"+ str(m.time.minute)}, broadcast=True)

@app.route("/delete", methods = ["POST"])
def delete():
    name = request.form.get('name')
    for i in channels_list:
        if i.name == name:
            channels_list.remove(i)
            return jsonify({"success":True})
    return jsonify({"success":False})
