from flask_sqlalchemy import SQLAlchemy
from datetime import datetime

db = SQLAlchemy()

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(100), unique=True, nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    medications = db.relationship('Medication', backref='user', lazy=True)

    def __repr__(self):
        return f'<User {self.username}>'

class Medication(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    dosage = db.Column(db.String(100), nullable=False)
    frequency = db.Column(db.String(100), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    doses = db.relationship('Dose', backref='medication', lazy=True)

    def __repr__(self):
        return f'<Medication {self.name}>'

class Dose(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    scheduled_time = db.Column(db.DateTime, nullable=False)
    taken_time = db.Column(db.DateTime, nullable=True)
    medication_id = db.Column(db.Integer, db.ForeignKey('medication.id'), nullable=False)

    def __repr__(self):
        return f'<Dose {self.scheduled_time}>'
