"use client";

import { useState } from "react";
import { createRoom } from "../utils/api";

interface RoomFormProps {
  onRoomCreated: () => void; // Callback to refresh room list
}

export default function RoomForm({ onRoomCreated }: RoomFormProps) {
  const [id, setId] = useState("");
  const [roomSize, setRoomSize] = useState("single");
  const [hasMinibar, setHasMinibar] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const roomData = {
      id,
      room_size: roomSize,
      has_minibar: hasMinibar,
    };

    try {
      await createRoom(roomData);
      setId("");
      setRoomSize("single");
      setHasMinibar(false);
      onRoomCreated(); // Refresh the room list
    } catch (error) {
      console.error("Error creating room:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-2 mb-4">
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