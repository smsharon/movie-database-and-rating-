#!/usr/bin/env python3

from flask import Flask, jsonify, request, make_response
from models import db, Movie, Rating, User, Genre
from flask_migrate import Migrate
from flask_restful import Api, Resource
from datetime import datetime
from flask_cors import CORS

from models import db, Movie, Rating, User, Genre
from werkzeug.security import generate_password_hash, check_password_hash
import jwt
import os
from functools import wraps

app = Flask(__name__)
cors = CORS(app)

app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///Movies.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SECRET_KEY'] = 'said8354' 
app.json.compact = False

CORS(app)
migrate = Migrate(app, db)
db.init_app(app)

api = Api(app)


class Movies(Resource):

    def get(self):
        Movies = [Movie.to_dict() for Movie in Movie.query.all()]
        return make_response(jsonify(Movies), 200)

    def post(self):
        data = request.get_json()
        # Handle release_date
        release_date_str = data.get('release_date')
        if release_date_str:
            # Convert the date string to a Python date object
            release_date = datetime.strptime(release_date_str, '%Y-%m-%d').date()
        else:
            release_date = None  # Set to None if no date provided


        new_Movie = Movie(
            name=data['name'],
            image=data['image'],
            release_date=release_date,
            description=data['description'],
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

#ratings endpoint
class Ratings(Resource):

    def get(self):
        Ratings = [Rating.to_dict() for Rating in Rating.query.all()]
        return make_response(jsonify(Ratings), 200)

    def post(self):
        data = request.get_json()

        new_Rating = Rating(
            rating=data['rating'],
            review=data['review'],
        )

        db.session.add(new_Rating)
        db.session.commit()

        return make_response(new_Rating.to_dict(), 201)


api.add_resource(Ratings, '/Ratings')


class RatingByID(Resource):

    def get(self, id):
        Rating = Rating.query.filter_by(id=id).first().to_dict()
        return make_response(jsonify(Rating), 200)
    
    def patch(self, id):
        data = request.get_json()
        record = Rating.query.filter_by(id=id).first()
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

        record = Rating.query.filter_by(id=id).first()

        db.session.delete(record)
        db.session.commit()

        response = make_response("", 204)

        return response

api.add_resource(RatingByID, '/Ratings/<int:id>')

#users endpoints

class Users(Resource):

    def get(self):
        Users = [User.to_dict() for User in User.query.all()]
        return make_response(jsonify(Users), 200)

api.add_resource(Users, '/Users')

class UserByID(Resource):

    def get(self, id):
        User = User.query.filter_by(id=id).first().to_dict()
        return make_response(jsonify(User), 200)
    
api.add_resource(UserByID, '/Users/<int:id>')

#genre endpoints
class Genres(Resource):

    def get(self):
        Genres = [Genre.to_dict() for Genre in Genre.query.all()]
        return make_response(jsonify(Genres), 200)

api.add_resource(Genres, '/Genres')

api.add_resource(Register, '/register')
api.add_resource(Login, '/login')
api.add_resource(Protected, '/protected')

if __name__ == '__main__':
    app.run(port=3002, debug=True)
