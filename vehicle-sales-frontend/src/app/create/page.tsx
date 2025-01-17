// src/app/create/page.tsx
"use client";

import VehicleForm from "../../components/VehicleForm"; // Reuse the VehicleForm component

export default function CreateVehiclePage() {
  const handleVehicleCreated = () => {
    console.log("Vehicle created successfully!");
    // Add additional behavior here if needed, like redirecting or showing a success message
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Add a New Vehicle</h1>
      <VehicleForm onVehicleCreated={handleVehicleCreated} /> {/* Pass the required prop */}
    </div>
  );
}
