from flask import Blueprint, request, jsonify
from models import db, Hotel, RoomSize

bp = Blueprint("routes", __name__)

# Get all rooms (with optional filtering)
@bp.route("/rooms", methods=["GET"])
def get_rooms():
    room_size = request.args.get("room_size")
    has_minibar = request.args.get("has_minibar")

    query = Hotel.query
    if room_size:
        query = query.filter_by(room_size=RoomSize(room_size))
    if has_minibar:
        query = query.filter_by(has_minibar=has_minibar.lower() == "true")

    rooms = query.all()
    return jsonify([room.to_dict() for room in rooms])

# Get a room by room number
@bp.route("/rooms/<int:id>", methods=["GET"])
def get_room(id):
    room = Hotel.query.filter_by(id=id).first()
    if not room:
        return jsonify({"error": "Room not found"}), 404
    return jsonify(room.to_dict())

# Create a new room
@bp.route("/rooms", methods=["POST"])
def create_room():
    data = request.json
    if not data.get("id") or not data.get("room_size"):
        return jsonify({"error": "Invalid input"}), 400

    new_room = Hotel(
        id=data["id"],
        room_size=RoomSize(data["room_size"]),
        has_minibar=data.get("has_minibar", False)
    )
    db.session.add(new_room)
    db.session.commit()

    return jsonify(new_room.to_dict()), 201

# Update a room by id
@bp.route("/rooms/<int:id>", methods=["PUT"])
def update_room(id):
    room = Hotel.query.filter_by(id=id).first()
    if not room:
        return jsonify({"error": "Room not found"}), 404

    data = request.json
    if "room_size" in data:
        room.room_size = RoomSize(data["room_size"])
    if "has_minibar" in data:
        room.has_minibar = data["has_minibar"]

    db.session.commit()
    return jsonify(room.to_dict())

# Initial data setup
@bp.route("/init", methods=["POST"])
def init_rooms():
    db.session.add_all([
        Hotel(id="101", room_size=RoomSize.DOUBLE, has_minibar=True),
        Hotel(id="102", room_size=RoomSize.SINGLE, has_minibar=True),
        Hotel(id="103", room_size=RoomSize.SUITE, has_minibar=False),
    ])
    db.session.commit()
    return jsonify({"message": "Rooms initialized!"})