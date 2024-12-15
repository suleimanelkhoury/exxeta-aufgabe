from flask_sqlalchemy import SQLAlchemy
from enum import Enum

# SQLAlchemy instance used for ORM (Object Relational Mapping)
db = SQLAlchemy()

# Enum class to define room sizes in a standardized way
class RoomSize(Enum):
    SINGLE = "single"
    DOUBLE = "double"
    SUITE = "suite"

# Hotel table definition using SQLAlchemy
class Hotel(db.Model):
    __tablename__ = "exxellent_nights"

    # Primary key for the table (unique room ID)
    id = db.Column(db.Integer, primary_key=True, unique=True)
    # Room size column, restricted to values defined in RoomSize enum
    room_size = db.Column(db.Enum(RoomSize), nullable=False)
    # Boolean flag to indicate if the room has a minibar
    has_minibar = db.Column(db.Boolean, default=False)

    # Method to convert a Hotel object into a dictionary (for JSON responses)
    def to_dict(self):
        return {
            "id": self.id,
            "room_size": self.room_size.value,  # Return enum value as string
            "has_minibar": self.has_minibar
        }