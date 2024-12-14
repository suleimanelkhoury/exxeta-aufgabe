import axios from 'axios';

const API_BASE_URL = "/api"; // Base URL for API

// Create an Axios instance for reusability
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Fetch all rooms
export const fetchRooms = async () => {
  const response = await apiClient.get("/rooms");
  return response.data; // Axios returns response data directly
};

// Fetch a single room by ID
export const fetchRoomById = async (id) => {
  const response = await apiClient.get(`/rooms/${id}`);
  return response.data;
};

// Create a new room
export const createRoom = async (roomData) => {
  const response = await apiClient.post("/rooms", roomData);
  return response.data;
};

// Update an existing room
export const updateRoom = async (id, roomData) => {
  const response = await apiClient.put(`/rooms/${id}`, roomData);
  return response.data;
};

// Filter rooms based on query
export const filterRooms = async (filterQuery) => {
  const response = await apiClient.get(`/rooms?${filterQuery}`);
  return response.data;
};

// Initialize the Database
export const initDatabase = async () => {
  try {
    const response = await apiClient.post('/init');
    console.log(response.data.message); // This will log "Rooms initialized!"
    return response.data;
  } catch (error) {
    console.error('Error initializing database:', error);
    throw error;
  }
};
