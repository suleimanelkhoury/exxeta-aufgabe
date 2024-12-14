# Hotel Manager App - Container Setup

This guide will help you set up and deploy the **Hotel Manager** application using **Minikube** and **Kubernetes**. The setup includes both **frontend** and **backend** services, as well as the **PostgreSQL database**.

## Project Overview

The application consists of:

- **Frontend**: A Next.js application for the user interface.
- **Backend**: A Flask API to manage hotel room data.
- **PostgreSQL Database**: Used to persist hotel room data.

This guide covers how to:

1. Set up **Dockerfiles** for both frontend and backend.
2. Deploy the application in a **Kubernetes** cluster using **Minikube**.
3. Apply **Kubernetes deployment configurations** to manage the services.
4. Expose the services locally using **Minikube**.

## File Descriptions

### Dockerfiles

1. **Frontend Dockerfile**:
   - Located in the **hotel-manager-frontend** directory.
   - Defines the steps to build and run the **Next.js** application inside a Docker container.

2. **Backend Dockerfile**:
   - Located in the **hotel-manager** directory.
   - Defines the steps to build and run the **Flask** API inside a Docker container.

### Kubernetes Deployment Files

These configuration files define how the application components will run inside the Kubernetes cluster.

1. **PostgreSQL Deployment (`postgresql-deployment.yaml`)**:
   - Defines the deployment and service for PostgreSQL, used to store hotel room data.
   - Configures the database with user credentials and exposes it on port `5432`.

2. **Backend Deployment (`backend-deployment.yaml`)**:
   - Deploys the Flask API and connects it to the PostgreSQL database via environment variables.
   - Exposes the backend API on port `5000`.

3. **Frontend Deployment (`frontend-deployment.yaml`)**:
   - Deploys the Next.js application and exposes it on port `3000`.

## Setup Instructions

### 1. Building Docker Images

Before deploying to Kubernetes, you need to build Docker images for the frontend and backend.

#### Build the Frontend Docker Image:

```bash
cd hotel-manager-frontend
docker build -t hotel-manager-frontend .
```

#### Build the Backend Docker Image:

```bash
cd hotel-manager
docker build -t hotel-manager .
```

### 2. Setting Up Minikube

Ensure you have **Minikube** installed. If not, follow the [Minikube installation guide](https://minikube.sigs.k8s.io/docs/).

#### Start Minikube:

```bash
minikube start
```

### 3. Load the docker images to be recognised by minikube

```bash
minikube image load hotel-manager:latest
minikube image load hotel-manager-frontend:latest
```

### 4. Apply Kubernetes Configurations

You need to apply the Kubernetes deployment configurations for each service. Assuming all YAML files are located in a **k8s** directory, you can apply them using the following commands.

#### Apply PostgreSQL Deployment:

```bash
kubectl apply -f k8s/postgresql-deployment.yaml
```

#### Apply Backend Deployment:

```bash
kubectl apply -f k8s/backend-deployment.yaml
```

#### Apply Frontend Deployment:

```bash
kubectl apply -f k8s/frontend-deployment.yaml
```

### 5. Expose the Services Using Minikube

Once the services are running in the cluster, you need to expose them locally to access the application.

#### Expose the Frontend Service:

```bash
minikube service hotel-manager-frontend
```

#### Expose the Backend Service:

```bash
minikube service hotel-manager
```

This will open the frontend and backend services in your default web browser.

### 6. Verify the Deployments

You can check the status of the pods and services in the Kubernetes cluster to ensure everything is running correctly.

#### Check the Pods:

```bash
kubectl get pods
```

#### Check the Services:

```bash
kubectl get svc
```

### 7. Testing the Application

Once the services are exposed, you should be able to access the frontend via the Minikube URL for the frontend service and the backend via the Minikube URL for the backend service.

#### Access the Frontend:

The frontend will be accessible through the browser via the Minikube service URL for the frontend.

#### Access the Backend:

You can also test the backend API by interacting with the Minikube service URL for the backend.

### 7. Cleanup (Optional)

Once you're done with testing or development, you can delete the resources to clean up your Minikube environment.

#### Delete All Kubernetes Resources:

```bash
kubectl delete -f k8s/
```

#### Stop Minikube:

```bash
minikube stop
```

---