import { useState } from "react";
import { createVehicle } from "../utils/api";

interface VehicleFormProps {
  onVehicleCreated: () => void;
}

export default function VehicleForm({ onVehicleCreated }: VehicleFormProps) {
  const [id, setId] = useState("");
  const [make, setMake] = useState("");
  const [model, setModel] = useState("");
  const [year, setYear] = useState("");
  const [price, setPrice] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const vehicleData = {
      id,
      make,
      model,
      year: parseInt(year, 10),
      price: parseFloat(price),
    };

    try {
      await createVehicle(vehicleData);
      setId("");
      setMake("");
      setModel("");
      setYear("");
      setPrice("");
      onVehicleCreated();
    } catch (error) {
      console.error("Error creating vehicle:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-2 mb-4">
      <input
        type="text"
        placeholder="Vehicle ID"
        value={id}
        onChange={(e) => setId(e.target.value)}
        required
        className="border p-2 w-full"
      />
      <input
        type="text"
        placeholder="Make"
        value={make}
        onChange={(e) => setMake(e.target.value)}
        required
        className="border p-2 w-full"
      />
      <input
        type="text"
        placeholder="Model"
        value={model}
        onChange={(e) => setModel(e.target.value)}
        required
        className="border p-2 w-full"
      />
      <input
        type="number"
        placeholder="Year"
        value={year}
        onChange={(e) => setYear(e.target.value)}
        required
        className="border p-2 w-full"
      />
      <input
        type="number"
        placeholder="Price"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
        required
        className="border p-2 w-full"
      />
      <button type="submit" className="bg-green-500 text-white px-4 py-2">
        Save Vehicle
      </button>
    </form>
  );
}
