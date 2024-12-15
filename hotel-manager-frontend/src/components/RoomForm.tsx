"use client";

import { useState } from "react";
import axios from "axios";

// Define the callback function to refresh room list after room creation
interface RoomFormProps {
  onRoomCreated: () => void; 
}

export default function RoomForm({ onRoomCreated }: RoomFormProps) {
  // State hooks for form input values
  const [id, setId] = useState("");
  const [roomSize, setRoomSize] = useState("single");
  const [hasMinibar, setHasMinibar] = useState(false);

  // Handle form submission to create a new room
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); // Prevent default form submission behavior

    // Room data to be sent to the backend
    const roomData = {
      id,
      room_size: roomSize,
      has_minibar: hasMinibar,
    };

    try {
      // Make API call to create room
      await axios.post("http://hotel-manager:5000/rooms", roomData);
      setId(""); // Reset form fields
      setRoomSize("single");
      setHasMinibar(false);
      onRoomCreated(); // Trigger callback to refresh room list
    } catch (error) {
      console.error("Error creating room:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-2 mb-4">
      {/* Form inputs for room ID, size, and minibar */}
      <input
        type="text"
        placeholder="Room ID"
        value={id}
        onChange={(e) => setId(e.target.value)}
        required
        className="border p-2 w-full"
      />
      <select
        value={roomSize}
        onChange={(e) => setRoomSize(e.target.value)}
        className="border p-2 w-full"
      >
        <option value="single">Single</option>
        <option value="double">Double</option>
        <option value="suite">Suite</option>
      </select>
      <label>
        <input
          type="checkbox"
          checked={hasMinibar}
          onChange={(e) => setHasMinibar(e.target.checked)}
        />
        Has Minibar
      </label>
      <button type="submit" className="bg-green-500 text-white px-4 py-2">
        Save Room
      </button>
    </form>
  );
}
