import { useState } from "react";

interface QueryRoomFormProps {
  onRoomSelected: (room: any) => void; // Callback to set selected room in parent
}

const QueryRoomForm: React.FC<QueryRoomFormProps> = ({ onRoomSelected }) => {
  const [roomId, setRoomId] = useState<number | string>(""); // State to manage input value
  const [error, setError] = useState<string | null>(null); // State to handle errors (e.g., invalid room ID)

  // Handle the input field's change event
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRoomId(e.target.value); // Update the room ID in state
    setError(null); // Reset error when user starts typing
  };

  // Function to fetch room by ID and update the parent component with selected room
  const handleBlur = async () => {
    if (!roomId) {
      setError("Please enter a valid Room ID.");
      return;
    }

    try {
      const response = await fetch(`/api/rooms/${roomId}`); // Replace with the actual API call
      const room = await response.json();

      if (response.ok) {
        onRoomSelected(room); // Send the room data to the parent
      } else {
        setError("Room not found. Please check the Room ID.");
        onRoomSelected(null); // Reset selected room in case of error
      }
    } catch (err) {
      setError("Error fetching room. Please try again.");
      console.error(err);
    }
  };

  return (
    <div>
      <input
        type="number"
        placeholder="Enter Room ID"
        value={roomId}
        onChange={handleInputChange}
        onBlur={handleBlur} // Trigger the query when the input loses focus
        className="border p-2 mr-2"
      />
      {error && <p className="text-red-500">{error}</p>} {/* Display error messages */}
    </div>
  );
};

export default QueryRoomForm;
