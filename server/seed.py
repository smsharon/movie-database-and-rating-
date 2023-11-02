#!/usr/bin/env python3

from app import app
from models import db, Movie, Genre, MovieGenreAssociation, User, Rating
from datetime import datetime


with app.app_context():

   # Delete existing data from all tables
    db.session.query(Movie).delete()
    db.session.query(Rating).delete()
    db.session.query(User).delete()
    db.session.query(Genre).delete()
    db.session.query(MovieGenreAssociation).delete()


    #add movie records
    hocus = Movie(
        id=1,
        name="hocus",
        image="./images/hocus.jpeg",
        release_date=datetime(2023, 1, 1),
        description= "This is the description of Movie 1."
    )

    animal = Movie(
        id=2,
        name="animal",
        image="./images/animal.jpeg",
        release_date= datetime(2023, 2, 15),
        description= "This is the description of Movie 2."
    )
    equalizer = Movie(
        id=3,
        name="equalizer",
        image="./images/equalizer.jpeg",
        release_date= datetime(2023, 3, 16),
        description= "This is the description of Movie 3."
    )
    halloween = Movie(
        id=4,
        name="halloween",
        image="./images/halloween.jpeg",
        release_date= datetime(2023, 4, 17),
        description= "This is the description of Movie 4."
    )
    scary = Movie(
        id=5,
        name="scary",
        image="./images/scary.jpeg",
        release_date= datetime(2023, 5, 18),
        description= "This is the description of Movie 5."
    )
    persian = Movie(
        id=6,
        name="persian",
        image="./images/persian.jpeg",
        release_date= datetime(2023, 6, 18),
        description= "This is the description of Movie 6."
    )
    mario = Movie(
        id=7,
        name="mario",
        image="./images/mario.jpeg",
        release_date= datetime(2023, 7, 19),
        description= "This is the description of Movie 7."
    )
    killer = Movie(
        id=8,
        name="killer",
        image="./images/killer.jpeg",
        release_date= datetime(2023, 8, 20),
        description= "This is the description of Movie 8."
    )
    teen = Movie(
        id=9,
        name="teen",
        image="./images/teen.jpeg",
        release_date= datetime(2023, 9, 21),
        description= "This is the description of Movie 9."
    )
    

    db.session.add_all([hocus, animal, equalizer, scary, persian, mario, killer, teen])

    # Add rating records
    user1 = User(
        id=1,
        username="user1",
        email="shallon@gmail.com",
        password="password1"
    )

    user2 = User(
        id=2,
        username="user2",
        email="joedoe@gmail.com",
        password="password2"
    )

    db.session.add_all([user1, user2])

    rating1 = Rating(
        id=1,
        user_id=1,
        movie_id=1,
        rating=4,
        review="Good movie."
    )

    rating2 = Rating(
        id=2,
        user_id=2,
        movie_id=1,
        rating=5,
        review="Excellent movie."
    )

    db.session.add_all([rating1, rating2])

    # Add genre records
    action = Genre(
        id=1,
        name="Action"
    )

    comedy = Genre(
        id=2,
        name="Comedy"
    )

    db.session.add_all([action, comedy])

   # Create associations
    ##association1 = MovieGenreAssociation(movie=hocus, genre=action)
    #association2 = MovieGenreAssociation(movie=hocus, genre=comedy)
    #association3 = MovieGenreAssociation(movie=animal, genre=comedy)

    #db.session.add_all([association1, association2, association3])


    db.session.commit()
