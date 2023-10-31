#!/usr/bin/env python3

from app import app
from models import db, Movie


with app.app_context():

    Movie.query.delete()

    hocus = Movie(
        id=1,
        name="hocus",
        image="./images/hocus.jpeg",
        price=11.50,
        is_in_stock=True,
    )

    animal = Movie(
        id=2,
        name="animal",
        image="./images/animal.jpeg",
        price=25.98,
        is_in_stock=False,
    )

    db.session.add_all([hocus, animal])
    db.session.commit()
