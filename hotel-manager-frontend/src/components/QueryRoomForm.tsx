import { useState } from "react";
import { fetchRoomById } from "../utils/api";

interface QueryRoomFormProps {
  onRoomSelected: () => void;
}

const QueryRoomForm: React.FC<QueryRoomFormProps> = ({ onRoomSelected }) => {
  const [roomId, setRoomId] = useState<string>(""); // Room ID input state
  const [selectedRoom, setSelectedRoom] = useState<any | null>(null); // Selected room state
  const [error, setError] = useState<string | null>(null); // Error state

  // Function to handle the query when the button is clicked
  const handleQuery = async () => {
    if (!roomId) {
      setError("Please enter a valid Room ID.");
      return;
    }

    try {
      const room = await fetchRoomById(roomId); // Call the API to fetch room by ID
      setSelectedRoom(room); // Set the selected room data
      setError(null); // Clear any previous error
      onRoomSelected(); // Trigger parent callback to refresh the room list
    } catch (err) {
      setError("Room not found. Please check the Room ID.");
      setSelectedRoom(null); // Reset selected room on error
    }
  };

  return (
    <div>
      {/* Input field for Room ID */}
      <input
        type="number"
        placeholder="Enter Room ID"
        value={roomId}
        onChange={(e) => setRoomId(e.target.value)} // Update roomId as the user types
        className="border p-2 mr-2"
      />
      {/* Query button */}
      <button
        onClick={handleQuery} // Trigger the query when clicked
        className="bg-blue-500 text-white px-4 py-2"
      >
        Query Room
      </button>

      {/* Display error message */}
      {error && <p className="text-red-500">{error}</p>}

      {/* Display room details if found */}
      {selectedRoom && (
        <div className="border p-2 mt-2 rounded">
          <p><strong>Room ID:</strong> {selectedRoom.id}</p>
          <p><strong>Room Size:</strong> {selectedRoom.room_size}</p>
          <p><strong>Minibar:</strong> {selectedRoom.has_minibar ? "Yes" : "No"}</p>
        </div>
      )}
    </div>
  );
};

export default QueryRoomForm;
