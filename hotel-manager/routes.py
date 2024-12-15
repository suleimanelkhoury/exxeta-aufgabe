from flask import Blueprint, request, jsonify
from models import db, Hotel, RoomSize

# Define a Blueprint for the routes to modularize the app
bp = Blueprint("routes", __name__)

# Endpoint: Get all rooms with optional filtering by room size and minibar status
@bp.route("/rooms", methods=["GET"])
def get_rooms():
    """
    Retrieve all rooms, with optional filtering:
    - room_size: Filter by room size (e.g., "single", "double", "suite")
    - has_minibar: Filter by minibar status (true/false)
    """
    room_size = request.args.get("room_size")
    has_minibar = request.args.get("has_minibar")

    # Start with the base query
    query = Hotel.query
    if room_size:
        query = query.filter_by(room_size=RoomSize(room_size))  # Filter by room size
    if has_minibar:
        query = query.filter_by(has_minibar=has_minibar.lower() == "true")  # Convert to boolean

    rooms = query.all()  # Execute query
    return jsonify([room.to_dict() for room in rooms])  # Return as JSON list

# Endpoint: Get a specific room by ID or room number
@bp.route("/rooms/<int:id>", methods=["GET"])
def get_room(id):
    """
    Retrieve a specific room by its ID.
    """
    room = Hotel.query.filter_by(id=id).first()
    if not room:
        return jsonify({"error": "Room not found"}), 404
    return jsonify(room.to_dict())

# Endpoint: Create a new room
@bp.route("/rooms", methods=["POST"])
def create_room():
    """
    Create a new room with the provided data:
    - id: Room ID
    - room_size: Room size (single, double, suite)
    - has_minibar: Optional minibar status (default is False)
    """
    data = request.json
    if not data.get("id") or not data.get("room_size"):
        return jsonify({"error": "Invalid input"}), 400

    # Create a new Hotel object
    new_room = Hotel(
        id=data["id"],
        room_size=RoomSize(data["room_size"]),
        has_minibar=data.get("has_minibar", False)
    )
    db.session.add(new_room)  # Add to session
    db.session.commit()  # Commit changes

    return jsonify(new_room.to_dict()), 201  # Return created room

# Endpoint: Update an existing room by ID
@bp.route("/rooms/<int:id>", methods=["PUT"])
def update_room(id):
    """
    Update an existing room's details.
    """
    room = Hotel.query.filter_by(id=id).first()
    if not room:
        return jsonify({"error": "Room not found"}), 404

    data = request.json
    # Update room details if provided
    if "room_size" in data:
        room.room_size = RoomSize(data["room_size"])
    if "has_minibar" in data:
        room.has_minibar = data["has_minibar"]

    db.session.commit()  # Commit changes
    return jsonify(room.to_dict())

# Endpoint: Initialize the database with sample room data
@bp.route("/init", methods=["POST"])
def init_rooms():
    """
    Initialize the database with predefined sample rooms.
    """
    db.session.add_all([
        Hotel(id="101", room_size=RoomSize.DOUBLE, has_minibar=True),
        Hotel(id="102", room_size=RoomSize.SINGLE, has_minibar=True),
        Hotel(id="103", room_size=RoomSize.SUITE, has_minibar=False),
    ])
    db.session.commit()
    return jsonify({"message": "Rooms initialized!"})