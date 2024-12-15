import { useEffect, useState } from "react";
import { fetchRooms, fetchRoomById, initDatabase } from "../utils/api";
import RoomList from "../components/RoomList";
import FilterForm from "../components/FilterForm";
import RoomForm from "../components/RoomForm";
import QueryRoomForm from "../components/QueryRoomForm"; // Import new component

export default function HomePage() {
  const [rooms, setRooms] = useState([]); // List of rooms
  const [selectedRoom, setSelectedRoom] = useState(null); // Selected room details
  const [activeTab, setActiveTab] = useState("list"); // Tracks which tab is active

  const loadRooms = async (): Promise<void> => {
    try {
      const roomsData = await fetchRooms();
      setRooms(roomsData); // Update the state with fetched room data
    } catch (error) {
      console.error("Error fetching rooms:", error);
    }
  };

  const loadRoomById = async (id: number) => {
    try {
      const roomData = await fetchRoomById(id);
      setSelectedRoom(roomData); // Set the selected room's details
    } catch (error) {
      console.error("Error fetching room:", error);
      setSelectedRoom(null); // In case of error, reset selected room
    }
  };

  const initDatabaseAndLoadRooms = async () => {
    try {
      await initDatabase();
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
            <FilterForm setRooms={setRooms} />
          </div>
          <RoomList rooms={rooms} />
        </div>
      )}

      {activeTab === "query" && (
        <div>
          <QueryRoomForm onRoomSelected={setSelectedRoom} /> {/* Query a room by ID */}
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
