from flask import Flask, request, jsonify
from flask_restful import Api, Resource
from models import db, User, Medication, Dose
from datetime import datetime

app = Flask(__name__)
app.config.from_object('config.Config')
db.init_app(app)
api = Api(app)

class UserResource(Resource):
    def get(self, user_id):
        user = User.query.get(user_id)
        if not user:
            return {'message': 'User not found'}, 404
        return {'id': user.id, 'username': user.username, 'email': user.email}, 200

    def post(self):
        data = request.get_json()
        new_user = User(username=data['username'], email=data['email'])
        db.session.add(new_user)
        db.session.commit()
        return {'message': 'User created', 'user_id': new_user.id}, 201

class MedicationResource(Resource):
    def get(self, user_id):
        user = User.query.get(user_id)
        if not user:
            return {'message': 'User not found'}, 404
        medications = Medication.query.filter_by(user_id=user_id).all()
        return [{'id': med.id, 'name': med.name, 'dosage': med.dosage, 'frequency': med.frequency} for med in medications], 200

    def post(self, user_id):
        data = request.get_json()
        new_medication = Medication(name=data['name'], dosage=data['dosage'], frequency=data['frequency'], user_id=user_id)
        db.session.add(new_medication)
        db.session.commit()
        return {'message': 'Medication added', 'medication_id': new_medication.id}, 201

class DoseResource(Resource):
    def post(self, med_id):
        data = request.get_json()
        new_dose = Dose(scheduled_time=datetime.fromisoformat(data['scheduled_time']), medication_id=med_id)
        db.session.add(new_dose)
        db.session.commit()
        return {'message': 'Dose scheduled', 'dose_id': new_dose.id}, 201

    def put(self, dose_id):
        dose = Dose.query.get(dose_id)
        if not dose:
            return {'message': 'Dose not found'}, 404
        dose.taken_time = datetime.now()
        db.session.commit()
        return {'message': 'Dose updated'}, 200

    def get(self, med_id):
        doses = Dose.query.filter_by(medication_id=med_id).all()
        return [{'id': dose.id, 'scheduled_time': dose.scheduled_time, 'taken_time': dose.taken_time} for dose in doses], 200

api.add_resource(UserResource, '/user', '/user/<int:user_id>')
api.add_resource(MedicationResource, '/medications/<int:user_id>')
api.add_resource(DoseResource, '/dose/<int:med_id>', '/dose/take/<int:dose_id>')

if __name__ == '__main__':
    app.run(debug=True)
