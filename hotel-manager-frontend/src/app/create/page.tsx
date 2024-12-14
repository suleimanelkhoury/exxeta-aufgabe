// src/app/create/page.tsx
"use client";

import RoomForm from "../../components/RoomForm"; // Reuse the RoomForm component

export default function CreateRoomPage() {
  const handleRoomCreated = () => {
    console.log("Room created successfully!");
    // Add additional behavior here if needed, like redirecting or showing a success message
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Add a New Room</h1>
      <RoomForm onRoomCreated={handleRoomCreated} /> {/* Pass the required prop */}
    </div>
  );
}
