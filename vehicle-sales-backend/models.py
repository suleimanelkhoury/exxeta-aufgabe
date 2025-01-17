from flask_sqlalchemy import SQLAlchemy
from enum import Enum
from datetime import datetime

# SQLAlchemy instance used for ORM (Object Relational Mapping)
db = SQLAlchemy()

# Enum class to define transmission types
class Transmission(Enum):
    AUTOMATIC = "automatic"
    MANUAL = "manual"
    SEMI_AUTOMATIC = "semi-automatic"

# Enum class to define drivetrain types
class Drivetrain(Enum):
    ELECTRIC = "electric"
    HYBRID = "hybrid"
    PLUGIN_HYBRID = "plugin hybrid"
    DIESEL = "diesel"
    PETROL = "petrol"

# Vehicle table definition using SQLAlchemy
class Vehicle(db.Model):
    __tablename__ = "used_cars"

    # Primary key for the table (unique vehicle ID)
    id = db.Column(db.Integer, primary_key=True, unique=True)
    make = db.Column(db.String(50), nullable=False)  # Car manufacturer
    model = db.Column(db.String(50), nullable=False)  # Specific car model
    images = db.Column(db.Text, nullable=True)  # Store Base64 strings as text
    year = db.Column(db.Integer, nullable=False)  # Year of manufacture
    mileage = db.Column(db.Integer, nullable=False)  # Kilometer mileage
    transmission = db.Column(db.Enum(Transmission), nullable=False)  # Transmission type
    drivetrain = db.Column(db.Enum(Drivetrain), nullable=False)  # Drivetrain type
    color = db.Column(db.String(30), nullable=False)  # Exterior color
    price = db.Column(db.Float, nullable=False)  # Selling price
    negotiable = db.Column(db.Boolean, default=False)  # Price negotiability
    date_listed = db.Column(db.DateTime, default=datetime.utcnow)  # Listing date

    # Method to convert a Vehicle object into a dictionary (for JSON responses)
    def to_dict(self):
        return {
            "id": self.id,
            "make": self.make,
            "model": self.model,
            "images": self.images, 
            "year": self.year,
            "mileage": self.mileage,
            "transmission": self.transmission.value,
            "drivetrain": self.drivetrain.value,
            "color": self.color,
            "price": self.price,
            "negotiable": self.negotiable,
            "date_listed": self.date_listed.isoformat()
        }