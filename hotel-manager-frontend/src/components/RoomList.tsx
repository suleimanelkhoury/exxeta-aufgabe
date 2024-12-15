"use client";

// Define a Room type for the room data
interface Room {
  id: number;
  room_size: string;
  has_minibar: boolean;
}

// Define the props for RoomList to accept an array of rooms
interface RoomListProps {
  rooms: Room[];
}

export default function RoomList({ rooms = [] }: RoomListProps) {
  return (
    <div>
      <h2 className="text-xl font-bold mb-2">Room List</h2>
      <ul className="space-y-2">
        {/* Check if there are rooms to display */}
        {rooms.length > 0 ? (
          rooms.map((room) => (
            <li
              key={room.id}
              className="border p-2 rounded shadow-md"
            >
              {/* Display room details */}
              <p><strong>Room ID:</strong> {room.id}</p>
              <p><strong>Room Size:</strong> {room.room_size}</p>
              <p><strong>Minibar:</strong> {room.has_minibar ? "Yes" : "No"}</p>
            </li>
          ))
        ) : (
          <p>No rooms available.</p> // Display message if no rooms are available
        )}
      </ul>
    </div>
  );
}
