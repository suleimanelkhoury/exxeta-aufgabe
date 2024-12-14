const axios = require('axios');

// Base URL of your Flask API
const API_URL = "http://hotel-manager:5000"; // Replace with your Minikube IP or relevant backend service URL

// Test GET /rooms route with optional filters
async function testGetRooms() {
    try {
        const response = await axios.get(`${API_URL}/rooms`, {
            params: {
                room_size: "double",  // Example filter for room size
                has_minibar: "true"   // Example filter for minibar
            }
        });
        console.log("GET /rooms Success:", response.data);
    } catch (error) {
        console.error("Error GET /rooms:", error.message);
    }
}

// Test GET /rooms/:id route with a valid room ID
async function testGetRoomById(id) {
    try {
        const response = await axios.get(`${API_URL}/rooms/${id}`);
        console.log(`GET /rooms/${id} Success:`, response.data);
    } catch (error) {
        console.error(`Error GET /rooms/${id}:`, error.message);
    }
}

// Test POST /rooms route to create a new room
async function testCreateRoom() {
    const newRoom = {
        id: "104",
        room_size: "suite",
        has_minibar: true
    };

    try {
        const response = await axios.post(`${API_URL}/rooms`, newRoom);
        console.log("POST /rooms Success:", response.data);
    } catch (error) {
        console.error("Error POST /rooms:", error.message);
    }
}

// Test PUT /rooms/:id route to update a room
async function testUpdateRoom(id) {
    const updateData = {
        room_size: "single",
        has_minibar: false
    };

    try {
        const response = await axios.put(`${API_URL}/rooms/${id}`, updateData);
        console.log(`PUT /rooms/${id} Success:`, response.data);
    } catch (error) {
        console.error(`Error PUT /rooms/${id}:`, error.message);
    }
}

// Test POST /init route to initialize rooms
async function testInitializeRooms() {
    try {
        const response = await axios.post(`${API_URL}/init`);
        console.log("POST /init Success:", response.data);
    } catch (error) {
        console.error("Error POST /init:", error.message);
    }
}

// Run the tests
async function runTests() {
    console.log("Testing Flask API routes...");

    // Initialize rooms (to ensure test data is set up)
    await testInitializeRooms();

    // Test the routes
    await testGetRooms();           // Test GET /rooms with filters
    await testGetRoomById(101);     // Test GET /rooms/{id} with a valid room ID
    await testCreateRoom();         // Test POST /rooms to create a new room
    await testUpdateRoom(101);      // Test PUT /rooms/{id} to update a room
}

runTests();
