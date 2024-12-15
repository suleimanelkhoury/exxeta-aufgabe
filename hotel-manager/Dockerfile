# Use a Python base image
FROM python:3.10-slim

# Set the working directory
WORKDIR /app

# Copy the backend project files
COPY . /app

# Install dependencies
RUN pip install -r requirements.txt

# Expose port 5000 for Flask (this is just for documentation)
EXPOSE 5000

# Command to run the migration commands and then run the backend app
CMD flask db init && flask db migrate -m "Initial migration" && flask db upgrade && python app.py
