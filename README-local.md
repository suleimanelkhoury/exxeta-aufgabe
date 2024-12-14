# **Hotel Manager**

This project consists of two parts, frontend and backend

## **Hotel Manager Backend**

This project implements the backend for a **Hotel Manager** application using **Flask**, **PostgreSQL**, and **Docker Compose**. It provides a REST API to manage hotel rooms, including querying, creating, updating, and filtering room data.

---

### **Project Structure**

```plaintext
hotel-manager/
│
├── app.py                  # Main entry point to start the Flask server
├── database.py             # Database configuration and initialization
├── docker-compose.yml      # Defines the PostgreSQL container setup using Docker Compose
├── models.py               # SQLAlchemy models for hotel rooms
├── routes.py               # API endpoints (CRUD and filtering logic)
├── requirements.txt        # Python dependencies for the project
├── migrations/             # Folder containing Flask-Migrate migration files
└── README.md               # Project documentation (this file)
```

---

### **Setup and Run the Backend**

#### **1. Clone the Repository**
```bash
git clone <your-repository-url>
cd hotel-manager
```

---

#### **2. Start PostgreSQL with Docker Compose**
Ensure Docker is installed and running, then start the PostgreSQL container:
```bash
docker-compose up -d
```

---

#### **3. Set Up a Virtual Environment**
Create and activate a virtual environment:
```bash
python -m venv .venv
source .venv/bin/activate  # For Windows: .venv\Scripts\activate
```

---

#### **4. Install Dependencies**
Install required Python packages:
```bash
pip install -r requirements.txt
```

---

#### **5. Initialize the Database**
Run the following commands to set up the database:

1. Initialize Flask-Migrate:
   ```bash
   flask db init
   ```

2. Generate migration scripts:
   ```bash
   flask db migrate -m "Initial migration"
   ```

3. Apply migrations to the database:
   ```bash
   flask db upgrade
   ```

---

#### **6. Start the Flask Server**
Run the Flask application:
```bash
python app.py
```

The server will start at `http://127.0.0.1:5000`.

---

#### **7. Insert Initial Data to test the backend using curl (optional)**
To pre-populate the database with sample data, call the `/init` endpoint:

```bash
curl -X POST http://127.0.0.1:5000/init # For Windows: curl.exe -X POST http://127.0.0.1:5000/init
```

---

#### **8. Stop PostgreSQL Container**
To stop the PostgreSQL Docker container:
```bash
docker-compose down
```

---

## Hotel Manager Frontend

This is the frontend of the **Hotel Manager** application, built with **Next.js**. It interacts with the backend API to manage and display hotel room data.

### Installation

1. Install dependencies:
   ```bash
   npm install
   npm install axios #recommended for easier API requests
   ```

2. Run the development server:
   ```bash
   npm run dev
   ```

The app will be available at [http://localhost:3000](http://localhost:3000).

---

### Frontend Structure

#### `page.tsx`
- The main page of the application.
- Fetches room data from the backend API and passes it to the `RoomList` component.
- Contains the state for the room filter and integrates the `FilterForm` component.

#### `FilterForm.tsx`
- A form that provides a dropdown menu to filter rooms by size (`single`, `double`, `suite`).
- Updates the parent component’s state (`filter`) based on the user’s selection.

#### `RoomForm.tsx`
- A form used for adding or updating room details.
- Allows users to specify room size and whether it has a minibar.
- Sends a `POST` or `PUT` request to the backend to save the room data.

#### `RoomList.tsx`
- Displays a list of rooms fetched from the backend.
- Filters the rooms based on the selected `room_size` and displays them.
- Shows room details such as `Room ID`, `Room Size`, and `Minibar`.

---