from flask import Blueprint, request, jsonify
from models import db, Vehicle, Transmission, Drivetrain

# Define a Blueprint for the routes to modularize the app
bp = Blueprint("routes", __name__)

# Endpoint: Get all vehicles with optional filtering
@bp.route("/vehicles", methods=["GET"])
def get_vehicles():
    """
    Retrieve all vehicles, with optional filtering.
    Filters include make, model, year, transmission, drivetrain, color, and price range.
    """
    filters = {
        "make": request.args.get("make"),
        "model": request.args.get("model"),
        "year": request.args.get("year"),
        "transmission": request.args.get("transmission"),
        "drivetrain": request.args.get("drivetrain"),
        "color": request.args.get("color"),
        "price_min": request.args.get("price_min"),
        "price_max": request.args.get("price_max"),
    }

    query = Vehicle.query

    if filters["make"]:
        query = query.filter_by(make=filters["make"])
    if filters["model"]:
        query = query.filter_by(model=filters["model"])
    if filters["year"]:
        query = query.filter_by(year=int(filters["year"]))
    if filters["transmission"]:
        query = query.filter_by(transmission=Transmission(filters["transmission"]))
    if filters["drivetrain"]:
        query = query.filter_by(drivetrain=Drivetrain(filters["drivetrain"]))
    if filters["color"]:
        query = query.filter_by(color=filters["color"])
    if filters["price_min"]:
        query = query.filter(Vehicle.price >= float(filters["price_min"]))
    if filters["price_max"]:
        query = query.filter(Vehicle.price <= float(filters["price_max"]))

    vehicles = query.all()
    return jsonify([vehicle.to_dict() for vehicle in vehicles])

# Endpoint: Get a specific vehicle by ID
@bp.route("/vehicles/<int:id>", methods=["GET"])
def get_vehicle(id):
    """
    Retrieve a specific vehicle by its ID.
    """
    vehicle = Vehicle.query.filter_by(id=id).first()
    if not vehicle:
        return jsonify({"error": "Vehicle not found"}), 404
    return jsonify(vehicle.to_dict())

# Endpoint: Create a new vehicle listing
@bp.route("/vehicles", methods=["POST"])
def create_vehicle():
    """
    Create a new vehicle listing with the provided data.
    """
    data = request.json
    required_fields = ["id", "make", "model", "year", "mileage", "transmission", "drivetrain", "color", "price"]
    if not all(field in data for field in required_fields):
        return jsonify({"error": "Invalid input"}), 400

    new_vehicle = Vehicle(
        id=data["id"],
        make=data["make"],
        model=data["model"],
        images=data.get("images"),  # Expect Base64 string here
        year=data["year"],
        mileage=data["mileage"],
        transmission=Transmission(data["transmission"]),
        drivetrain=Drivetrain(data["drivetrain"]),
        color=data["color"],
        price=data["price"],
        negotiable=data.get("negotiable", False)
    )
    db.session.add(new_vehicle)
    db.session.commit()
    return jsonify(new_vehicle.to_dict()), 201

# Endpoint: Update an existing vehicle by ID
@bp.route("/vehicles/<int:id>", methods=["PUT"])
def update_vehicle(id):
    """
    Update an existing vehicle's details.
    """
    vehicle = Vehicle.query.filter_by(id=id).first()
    if not vehicle:
        return jsonify({"error": "Vehicle not found"}), 404

    data = request.json
    if "make" in data:
        vehicle.make = data["make"]
    if "model" in data:
        vehicle.model = data["model"]
    if "images" in data:
        vehicle.images = data["images"]
    if "year" in data:
        vehicle.year = data["year"]
    if "mileage" in data:
        vehicle.mileage = data["mileage"]
    if "transmission" in data:
        vehicle.transmission = Transmission(data["transmission"])
    if "drivetrain" in data:
        vehicle.drivetrain = Drivetrain(data["drivetrain"])
    if "color" in data:
        vehicle.color = data["color"]
    if "price" in data:
        vehicle.price = data["price"]
    if "negotiable" in data:
        vehicle.negotiable = data["negotiable"]

    db.session.commit()
    return jsonify(vehicle.to_dict())

# Endpoint: Delete an existing vehicle by ID
@bp.route("/vehicles/<int:id>", methods=["DELETE"])
def delete_vehicle(id):
    """
    Delete an existing vehicle by its ID.
    """
    vehicle = Vehicle.query.filter_by(id=id).first()
    if not vehicle:
        return jsonify({"error": "Vehicle not found"}), 404

    db.session.delete(vehicle)
    db.session.commit()
    return jsonify({"message": "Vehicle deleted successfully"}), 200

# Endpoint: Initialize the database with sample vehicle data
@bp.route("/init", methods=["POST"])
def init_vehicles():
    """
    Initialize the database with predefined sample vehicles.
    """
    db.session.add_all([
        Vehicle(id=1, make="Toyota", model="Camry", images="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEAAAAAAAD/2wCEAAEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEB...", year=2020, mileage=25000, transmission=Transmission.AUTOMATIC, drivetrain=Drivetrain.PETROL, color="Red", price=20000, negotiable=True),
        Vehicle(id=2, make="Tesla", model="Model 3", images="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEAAAAAAAD/2wBDAAEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEB...", year=2022, mileage=5000, transmission=Transmission.AUTOMATIC, drivetrain=Drivetrain.ELECTRIC, color="White", price=40000, negotiable=False),
        Vehicle(id=3, make="Ford", model="F-150", images="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEAAAAAAAD/2wBDAAEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEB...", year=2019, mileage=45000, transmission=Transmission.MANUAL, drivetrain=Drivetrain.DIESEL, color="Blue", price=30000, negotiable=True),
    ])
    db.session.commit()
    return jsonify({"message": "Vehicles initialized!"})