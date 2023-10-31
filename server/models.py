from flask_sqlalchemy import SQLAlchemy
from sqlalchemy_serializer import SerializerMixin

db = SQLAlchemy()

class Movie(db.Model, SerializerMixin):
    __tablename__ = 'Movies'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String)
    image = db.Column(db.String)
    price = db.Column(db.Float)
    is_in_stock = db.Column(db.Boolean)

    def __repr__(self):
        return f'<Movie {self.name} | In Stock: {self.is_in_stock}>'
