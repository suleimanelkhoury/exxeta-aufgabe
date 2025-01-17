import { useState } from "react";
import { fetchVehicleById } from "../utils/api";

interface QueryVehicleFormProps {
  onVehicleSelected: () => void;
}

const QueryVehicleForm: React.FC<QueryVehicleFormProps> = ({ onVehicleSelected }) => {
  const [vehicleId, setVehicleId] = useState<string>("");
  const [selectedVehicle, setSelectedVehicle] = useState<any | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleQuery = async () => {
    if (!vehicleId) {
      setError("Please enter a valid Vehicle ID.");
      return;
    }

    try {
      const vehicle = await fetchVehicleById(vehicleId);
      setSelectedVehicle(vehicle);
      setError(null);
      onVehicleSelected();
    } catch (err) {
      setError("Vehicle not found. Please check the Vehicle ID.");
      setSelectedVehicle(null);
    }
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Enter Vehicle ID"
        value={vehicleId}
        onChange={(e) => setVehicleId(e.target.value)}
        className="border p-2 mr-2"
      />
      <button
        onClick={handleQuery}
        className="bg-blue-500 text-white px-4 py-2"
      >
        Query Vehicle
      </button>
      {error && <p className="text-red-500">{error}</p>}
      {selectedVehicle && (
        <div className="border p-2 mt-2 rounded">
          <p><strong>Make:</strong> {selectedVehicle.make}</p>
          <p><strong>Model:</strong> {selectedVehicle.model}</p>
          <p><strong>Year:</strong> {selectedVehicle.year}</p>
        </div>
      )}
    </div>
  );
};

export default QueryVehicleForm;
