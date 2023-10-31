#!/usr/bin/env python3

from flask import Flask, jsonify, request, make_response
from flask_migrate import Migrate
from flask_restful import Api, Resource

from models import db, Movie

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///Movies.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.json.compact = False

migrate = Migrate(app, db)
db.init_app(app)

api = Api(app)


class Movies(Resource):

    def get(self):
        Movies = [Movie.to_dict() for Movie in Movie.query.all()]
        return make_response(jsonify(Movies), 200)

    def post(self):
        data = request.get_json()

        new_Movie = Movie(
            name=data['name'],
            image=data['image'],
            price=data['price'],
        )

        db.session.add(new_Movie)
        db.session.commit()

        return make_response(new_Movie.to_dict(), 201)


api.add_resource(Movies, '/Movies')


class MovieByID(Resource):

    def get(self, id):
        Movie = Movie.query.filter_by(id=id).first().to_dict()
        return make_response(jsonify(Movie), 200)
    
    def patch(self, id):
        data = request.get_json()
        record = Movie.query.filter_by(id=id).first()
        for attr, value in data.items():
            setattr(record, attr, value)

        db.session.add(record)
        db.session.commit()

        response_dict = record.to_dict()

        response = make_response(
            jsonify(response_dict),
            200
        )

        return response
    
    def delete(self, id):

        record = Movie.query.filter_by(id=id).first()

        db.session.delete(record)
        db.session.commit()

        response = make_response("", 204)

        return response



api.add_resource(MovieByID, '/Movies/<int:id>')


if __name__ == '__main__':
    app.run(port=5555, debug=True)
