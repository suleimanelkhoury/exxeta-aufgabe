from database import create_app
from routes import bp

# Create the Flask app using the factory function
app = create_app()

# Register the routes blueprint to include the API endpoints
app.register_blueprint(bp)

# Run the Flask application
if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000)