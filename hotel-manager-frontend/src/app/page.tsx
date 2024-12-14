"use client";

import { useEffect, useState } from "react";
import { fetchRooms, fetchRoomById, initDatabase } from "../utils/api";
import RoomList from "../components/RoomList";
import FilterForm from "../components/FilterForm";
import RoomForm from "../components/RoomForm";

export default function HomePage() {
  const [rooms, setRooms] = useState([]);
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [activeTab, setActiveTab] = useState("list"); // Track the current tab

  // Fetch all rooms
  const loadRooms = async (): Promise<void> => {
    try {
      const roomsData = await fetchRooms();
      setRooms(roomsData);
    } catch (error) {
      console.error("Error fetching rooms:", error);
    }
  };

  // Fetch a specific room by ID
  const loadRoomById = async (id: number) => {
    try {
      const roomData = await fetchRoomById(id);
      setSelectedRoom(roomData);
    } catch (error) {
      console.error("Error fetching room:", error);
      setSelectedRoom(null);
    }
  };

  // Initialize the database with starting rows
  const initDatabaseAndLoadRooms = async () => {
    try {
      // First, initialize the database
      await initDatabase();
      
      // Then load the rooms
      const roomsData = await fetchRooms();
      setRooms(roomsData);
      
      console.log("Database initialized and rooms loaded successfully");
    } catch (error) {
      console.error("Error initializing database and loading rooms:", error);
    }
  };

  useEffect(() => {
    initDatabaseAndLoadRooms();
  }, []);

  // Tabs Navigation
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
      <h1 className="text-2xl font-bold mb-4">Hotel Room Manager (eXXellent Nights!)</h1>
      {/* Tabs Navigation */}
      {renderTabs()}

      {/* Tabs Content */}
      {activeTab === "list" && (
        <div>
          {/* Filter Rooms and Display List */}
          <div className="mb-4">
            <FilterForm setRooms={setRooms} />
          </div>

          <RoomList rooms={rooms} />
        </div>
      )}

      {activeTab === "query" && (
        <div>
          <input
            type="number"
            placeholder="Enter Room Number"
            onBlur={(e) => loadRoomById(Number(e.target.value))}
            className="border p-2 mr-2"
          />
          {selectedRoom ? (
            <div className="border p-2 mt-2 rounded">
              <p><strong>Room ID:</strong> {selectedRoom.id}</p>
              <p><strong>Room Size:</strong> {selectedRoom.room_size}</p>
              <p><strong>Minibar:</strong> {selectedRoom.has_minibar ? "Yes" : "No"}</p>
            </div>
          ) : (
            <p className="text-gray-500 mt-2">No room found. Please enter a valid ID.</p>
          )}
        </div>
      )}

      {activeTab === "create" && (
        <div>
          <RoomForm onRoomCreated={loadRooms} />
        </div>
      )}
    </div>
  );
}