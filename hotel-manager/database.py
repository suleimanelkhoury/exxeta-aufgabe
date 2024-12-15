from flask import Flask
import os
from flask_migrate import Migrate  # For database migrations
from flask_cors import CORS  # For Cross-Origin Resource Sharing
from models import db  # Import the database instance

def create_app():
    """
    Application Factory Function:
    - Initializes the Flask app
    - Configures database URI from environment variables
    - Adds CORS support
    - Initializes database and migration
    """
    app = Flask(__name__)

    # Fetch database connection details from environment variables
    db_host = os.getenv("POSTGRES_HOST")
    db_user = os.getenv("POSTGRES_USER")
    db_password = os.getenv("POSTGRES_PASSWORD")
    db_name = os.getenv("POSTGRES_DB")
    db_port = os.getenv("POSTGRES_PORT")

    # Allow cross-origin requests from any domain
    CORS(app, resources={r"/*": {"origins": "*"}})

    # Configure the SQLAlchemy database URI for PostgreSQL
    app.config['SQLALCHEMY_DATABASE_URI'] = f'postgresql://{db_user}:{db_password}@{db_host}:{db_port}/{db_name}'

    # Initialize database and Flask-Migrate
    db.init_app(app)  # Attach the database instance to the app
    Migrate(app, db)  # Enable migration support

    return app