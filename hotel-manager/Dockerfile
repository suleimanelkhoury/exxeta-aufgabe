# Use a Python base image
FROM python:3.10-slim

# Set the working directory
WORKDIR /app

# Copy the backend project files
COPY . /app

# Set environment variables (you may also want to use the .env file for sensitive values)
ENV POSTGRES_HOST=postgresql
ENV POSTGRES_USER=admin
ENV POSTGRES_PASSWORD=password
ENV POSTGRES_DB=hotel_manager
ENV POSTGRES_PORT=5432

# Install dependencies
RUN pip install -r requirements.txt

# Expose port 5000 for Flask
EXPOSE 5000

# Command to run the backend app
CMD flask db init && flask db migrate -m "Initial migration" && flask db upgrade && python app.py
