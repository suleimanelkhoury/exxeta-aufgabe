import React from "react";

interface Vehicle {
  id: number;
  make: string;
  model: string;
  year: number;
  price: number;
  mileage: number;
  transmission: string;
  drivetrain: string;
  color: string;
  negotiable: boolean;
}

interface VehicleListProps {
  vehicles: Vehicle[];
}

const VehicleList: React.FC<VehicleListProps> = ({ vehicles }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {vehicles.map((vehicle) => (
        <div
          key={vehicle.id}
          className="border p-4 rounded shadow hover:shadow-lg"
        >
          <h2 className="text-xl font-bold">{`${vehicle.make} ${vehicle.model} (${vehicle.year})`}</h2>
          <p>
            <strong>Price:</strong> ${vehicle.price.toLocaleString()}
          </p>
          <p>
            <strong>Mileage:</strong> {vehicle.mileage.toLocaleString()} km
          </p>
          <p>
            <strong>Transmission:</strong> {vehicle.transmission}
          </p>
          <p>
            <strong>Drivetrain:</strong> {vehicle.drivetrain}
          </p>
          <p>
            <strong>Color:</strong> {vehicle.color}
          </p>
          <p>
            <strong>Negotiable:</strong> {vehicle.negotiable ? "Yes" : "No"}
          </p>
        </div>
      ))}
    </div>
  );
};

export default VehicleList;
