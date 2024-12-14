# Use a lightweight Python image
FROM python:3.9-slim

# Set the working directory in the container
WORKDIR /app

# Copy the Python script into the container
COPY test_routes.py .

# Install the necessary Python dependencies
RUN pip install requests

# Command to run the Python script when the container starts
CMD ["python", "test_routes.py"]