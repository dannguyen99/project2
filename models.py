import os

from flask import Flask
from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class User(db.Model):
    __tablename__ = "users"
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String, nullable = False)
    password = db.Column(db.String, nullable = False)

class Channels(db.Model):
    __tablename__ = "channels"
    channel_name = db.Column(db.String, nullable = False)
    no_people = db.Column(db.Integer, default = 0)
    messages = db.Column(db.Integer, default = 0)
