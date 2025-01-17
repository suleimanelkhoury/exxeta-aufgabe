import axios from "axios";

const API_BASE_URL = "/api";

// Create an Axios instance for reusability
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Fetch all vehicles
export const fetchVehicles = async () => {
  const response = await apiClient.get("/vehicles");
  return response.data;
};

// Fetch a single vehicle by ID
export const fetchVehicleById = async (id) => {
  const response = await apiClient.get(`/vehicles/${id}`);
  return response.data;
};

// Create a new vehicle
export const createVehicle = async (vehicleData) => {
  const response = await apiClient.post("/vehicles", vehicleData);
  return response.data;
};

// Filter vehicles
export const filterVehicles = async (filterQuery) => {
  const response = await apiClient.get(`/vehicles?${filterQuery}`);
  return response.data;
};

// Delete a vehicle by ID
export const deleteVehicle = async (id) => {
  try {
    const response = await apiClient.delete(`/vehicles/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error deleting vehicle with ID ${id}:`, error);
    throw error;
  }
};

// Initialize the database
export const initDatabase = async () => {
  try {
    const response = await apiClient.post("/init");
    console.log(response.data.message);
    return response.data;
  } catch (error) {
    console.error("Error initializing database:", error);
    throw error;
  }
};
