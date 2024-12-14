from flask_sqlalchemy import SQLAlchemy
from enum import Enum

# Used as an Object relational mapping between the objects and the postgreSQL database
db = SQLAlchemy()

# Create new enum type to differentiate between different room sizes 
class RoomSize(Enum):
    SINGLE = "single"
    DOUBLE = "double"
    SUITE = "suite"

# Class to define the Hotel table, inheriting the SQLAlchemy object
class Hotel(db.Model):
    __tablename__ = "exxellent_nights"

    id = db.Column(db.Integer, primary_key=True, unique=True)
    room_size = db.Column(db.Enum(RoomSize), nullable=False)
    has_minibar = db.Column(db.Boolean, default=False)

    def to_dict(self):
        return {
            "id": self.id,
            "room_size": self.room_size.value,
            "has_minibar": self.has_minibar
        }
