from flask import Flask
import os
from flask_migrate import Migrate
from flask_cors import CORS
from models import db

def create_app():
    app = Flask(__name__)
    # Get the environment variables for DB connection
    db_host = os.getenv("POSTGRES_HOST", "hotel-manager-db")
    db_user = os.getenv("POSTGRES_USER", "admin")
    db_password = os.getenv("POSTGRES_PASSWORD", "password")
    db_name = os.getenv("POSTGRES_DB", "hotel_manager")
    db_port = os.getenv("POSTGRES_PORT", "5432")

    CORS(app, resources={r"/*": {"origins": "*"}})
    # Configure database URI (PostgreSQL with Docker)
    #app.config["SQLALCHEMY_DATABASE_URI"] = "postgresql://admin:password@localhost:5432/hotel_manager"
    app.config['SQLALCHEMY_DATABASE_URI'] = f'postgresql://{db_user}:{db_password}@{db_host}:{db_port}/{db_name}'
    # Initialize extensions
    db.init_app(app)
    Migrate(app, db)

    return app