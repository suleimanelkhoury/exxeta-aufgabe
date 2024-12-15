"use client";

import { useEffect, useState } from "react";
import { fetchRooms, fetchRoomById, initDatabase } from "../utils/api";
import RoomList from "../components/RoomList";
import FilterForm from "../components/FilterForm";
import RoomForm from "../components/RoomForm";

export default function HomePage() {
  // State hooks to manage room data and UI state
  const [rooms, setRooms] = useState([]); // List of rooms
  const [selectedRoom, setSelectedRoom] = useState(null); // Selected room details
  const [activeTab, setActiveTab] = useState("list"); // Tracks which tab is active

  // Function to load all rooms from the backend
  const loadRooms = async (): Promise<void> => {
    try {
      const roomsData = await fetchRooms();
      setRooms(roomsData); // Update the state with fetched room data
    } catch (error) {
      console.error("Error fetching rooms:", error);
    }
  };

  // Function to load a specific room by ID
  const loadRoomById = async (id: number) => {
    try {
      const roomData = await fetchRoomById(id);
      setSelectedRoom(roomData); // Set the selected room's details
    } catch (error) {
      console.error("Error fetching room:", error);
      setSelectedRoom(null); // In case of error, reset selected room
    }
  };

  // Initialize the database and load the room list
  const initDatabaseAndLoadRooms = async () => {
    try {
      // Initialize the database with predefined rows
      await initDatabase();
      
      // Load the list of rooms after initialization
      const roomsData = await fetchRooms();
      setRooms(roomsData);
      
      console.log("Database initialized and rooms loaded successfully");
    } catch (error) {
      console.error("Error initializing database and loading rooms:", error);
    }
  };

  // `useEffect` to call the initialization function on page load
  useEffect(() => {
    initDatabaseAndLoadRooms(); // Initialize DB and fetch rooms
  }, []);

  // Render tabs (list, query, create)
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
          onClick={() => setActiveTab(tab)} // Switch active tab
        >
          {tab.charAt(0).toUpperCase() + tab.slice(1)} Rooms
        </button>
      ))}
    </div>
  );

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Hotel Room Manager (eXXellent Nights!)</h1>
      {/* Render the navigation tabs */}
      {renderTabs()}

      {/* Content based on the active tab */}
      {activeTab === "list" && (
        <div>
          {/* Filter and List Rooms */}
          <div className="mb-4">
            <FilterForm setRooms={setRooms} /> {/* Filter rooms */}
          </div>

          <RoomList rooms={rooms} /> {/* Show rooms list */}
        </div>
      )}

      {activeTab === "query" && (
        <div>
          {/* Query a room by ID */}
          <input
            type="number"
            placeholder="Enter Room Number"
            onBlur={(e) => loadRoomById(Number(e.target.value))} // Fetch room by ID on blur
            className="border p-2 mr-2"
          />
          {selectedRoom ? (
            <div className="border p-2 mt-2 rounded">
              {/* Display selected room details */}
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
          {/* Room creation form */}
          <RoomForm onRoomCreated={loadRooms} />
        </div>
      )}
    </div>
  );
}
