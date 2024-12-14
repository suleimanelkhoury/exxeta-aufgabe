"use client";

interface Room {
  id: number;
  room_size: string;
  has_minibar: boolean;
}

interface RoomListProps {
  rooms: Room[];
}

export default function RoomList({ rooms = [] }: RoomListProps) {
  return (
    <div>
      <h2 className="text-xl font-bold mb-2">Room List</h2>
      <ul className="space-y-2">
        {rooms.length > 0 ? (
          rooms.map((room) => (
            <li
              key={room.id}
              className="border p-2 rounded shadow-md"
            >
              <p><strong>Room ID:</strong> {room.id}</p>
              <p><strong>Room Size:</strong> {room.room_size}</p>
              <p><strong>Minibar:</strong> {room.has_minibar ? "Yes" : "No"}</p>
            </li>
          ))
        ) : (
          <p>No rooms available.</p>
        )}
      </ul>
    </div>
  );
}
