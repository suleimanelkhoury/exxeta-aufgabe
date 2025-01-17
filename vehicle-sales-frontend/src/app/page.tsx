"use client";

import { useEffect, useState } from "react";
import { fetchVehicles, initDatabase } from "../utils/api";
import VehicleList from "../components/VehicleList";
import FilterForm from "../components/FilterForm";
import VehicleForm from "../components/VehicleForm";
import QueryVehicleForm from "../components/QueryVehicleForm";

export default function HomePage() {
  const [vehicles, setVehicles] = useState([]); // List of vehicles
  const [activeTab, setActiveTab] = useState("list"); // Tracks which tab is active: ("list", "query", "create")

  const loadVehicles = async (): Promise<void> => {
    try {
      const vehiclesData = await fetchVehicles();
      setVehicles(vehiclesData); // Update the state with fetched vehicle data
    } catch (error) {
      console.error("Error fetching vehicles:", error);
    }
  };

  useEffect(() => {
    initDatabase().then(loadVehicles); // Initialize database, then load vehicles
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
          {tab.charAt(0).toUpperCase() + tab.slice(1)} Vehicles
        </button>
      ))}
    </div>
  );

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Used Car Manager</h1>
      {renderTabs()}

      {activeTab === "list" && (
        <div>
          <div className="mb-4">
            <FilterForm setVehicles={setVehicles} /> {/* Filter vehicles */}
          </div>
          <VehicleList vehicles={vehicles} /> {/* List of vehicles */}
        </div>
      )}

      {activeTab === "query" && (
        <div>
          <QueryVehicleForm onVehicleSelected={loadVehicles} /> {/* Query a vehicle by ID */}
        </div>
      )}

      {activeTab === "create" && (
        <div>
          <VehicleForm onVehicleCreated={loadVehicles} /> {/* Add a vehicle */}
        </div>
      )}
    </div>
  );
}
