"use client";

import { useEffect, useState } from "react";
import { fetchRooms, initDatabase } from "../utils/api";
import RoomList from "../components/RoomList";
import FilterForm from "../components/FilterForm";
import RoomForm from "../components/RoomForm";
import QueryRoomForm from "../components/QueryRoomForm";

export default function HomePage() {
  const [rooms, setRooms] = useState([]); // List of rooms
  const [activeTab, setActiveTab] = useState("list"); // Tracks which tab is active between ("list", "query", or "create") 

  const loadRooms = async (): Promise<void> => {
    try {
      const roomsData = await fetchRooms();
      setRooms(roomsData); // Update the state with fetched room data
    } catch (error) {
      console.error("Error fetching rooms:", error);
    }
  };

  useEffect(() => {
    initDatabase().then(loadRooms); // Initialize database, then load rooms
  }, []);

  const renderTabs = () => (
    <div className="flex border-b mb-4">
      {["list", "query", "create"].map((tab) => (
        <button
          key={tab}
          className={`p-2 ${
            activeTab === tab
              ? "border-b-2 border-blue-500 font-bold"
              : "text-gray-500"
          }`}
          onClick={() => setActiveTab(tab)}
        >
          {tab.charAt(0).toUpperCase() + tab.slice(1)} Rooms
        </button>
      ))}
    </div>
  );

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Hotel Room Manager</h1>
      {renderTabs()}

      {activeTab === "list" && (
        <div>
          <div className="mb-4">
            <FilterForm setRooms={setRooms} /> {/* Displays Filters related to the Query */}
          </div>
          <RoomList rooms={rooms} /> {/* Returns list of Rooms */}
        </div>
      )}

      {activeTab === "query" && (
        <div>
          <QueryRoomForm onRoomSelected={loadRooms} /> {/* Query a room by ID */}
        </div>
      )}

      {activeTab === "create" && (
        <div>
          <RoomForm onRoomCreated={loadRooms} /> {/* Creates a Room and refreshes the list of all rooms using "loadRooms" argument */}
        </div>
      )}
    </div>
  );
}
