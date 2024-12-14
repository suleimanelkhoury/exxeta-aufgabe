import requests
import time
import json

def test_get_rooms():
    backend_url = "http://hotel-manager:5000/rooms"  # URL for the backend API route
    params = {
        "room_size": "double",  # Example filter for room size
        "has_minibar": "true"  # Example filter for minibar
    }
    
    try:
        response = requests.get(backend_url, params=params)
        if response.status_code == 200:
            print(f"GET /rooms Success! Status code: {response.status_code}")
            print(f"Response: {json.dumps(response.json(), indent=2)}")
        else:
            print(f"Error: GET /rooms Status code {response.status_code}")
    except Exception as e:
        print(f"Error making GET /rooms request: {e}")


def test_get_room_by_id(room_id):
    backend_url = f"http://hotel-manager:5000/rooms/{room_id}"
    try:
        response = requests.get(backend_url)
        if response.status_code == 200:
            print(f"GET /rooms/{room_id} Success! Status code: {response.status_code}")
            print(f"Response: {json.dumps(response.json(), indent=2)}")
        else:
            print(f"Error: GET /rooms/{room_id} Status code {response.status_code}")
    except Exception as e:
        print(f"Error making GET /rooms/{room_id} request: {e}")


def test_create_room():
    backend_url = "http://hotel-manager:5000/rooms"
    new_room = {
        "id": "104",
        "room_size": "suite",
        "has_minibar": True
    }

    try:
        response = requests.post(backend_url, json=new_room)
        if response.status_code == 201:
            print(f"POST /rooms Success! Status code: {response.status_code}")
            print(f"Response: {json.dumps(response.json(), indent=2)}")
        else:
            print(f"Error: POST /rooms Status code {response.status_code}")
    except Exception as e:
        print(f"Error making POST /rooms request: {e}")


def test_update_room(room_id):
    backend_url = f"http://hotel-manager:5000/rooms/{room_id}"
    update_data = {
        "room_size": "single",
        "has_minibar": False
    }

    try:
        response = requests.put(backend_url, json=update_data)
        if response.status_code == 200:
            print(f"PUT /rooms/{room_id} Success! Status code: {response.status_code}")
            print(f"Response: {json.dumps(response.json(), indent=2)}")
        else:
            print(f"Error: PUT /rooms/{room_id} Status code {response.status_code}")
    except Exception as e:
        print(f"Error making PUT /rooms/{room_id} request: {e}")


def test_initialize_rooms():
    backend_url = "http://hotel-manager:5000/init"
    try:
        response = requests.post(backend_url)
        if response.status_code == 200:
            print(f"POST /init Success! Status code: {response.status_code}")
            print(f"Response: {json.dumps(response.json(), indent=2)}")
        else:
            print(f"Error: POST /init Status code {response.status_code}")
    except Exception as e:
        print(f"Error making POST /init request: {e}")


if __name__ == "__main__":
    print("Testing backend routes...\n")
    time.sleep(5)  # Give it a few seconds to ensure services are up

    # Testing all routes:
    test_get_rooms()  # Test the GET /rooms route with filters
    test_get_room_by_id(101)  # Test the GET /rooms/{id} route with a valid room ID
    test_create_room()  # Test the POST /rooms route to create a new room
    test_update_room(101)  # Test the PUT /rooms/{id} route to update a room
    test_initialize_rooms()  # Test the POST /init route to initialize rooms