# Vehicle Sales Manager App

This guide will describe the set up and deployment of the application **Vehicle Sales Manager** using **Minikube** and **Kubernetes**. The setup includes both **frontend** and **backend** services, as well as the **PostgreSQL database**.

## Project Overview

The application consists of:

- **Frontend**: A Next.js application for the user interface.
- **Backend**: A Flask API to manage Vehicle Sales data.
- **PostgreSQL Database**: Used to persist Vehicle Sales data.

## Setup Instructions

### 1. Building Docker Images

Before deploying to Kubernetes, you need to build Docker images for the frontend and backend.

#### Build the Frontend Docker Image:
The following bash code defines the steps to build and run the **Next.js** application inside a Docker container:

```bash
cd vehicle-sales-frontend
docker build -t vehicle-sales-frontend .
```

#### Build the Backend Docker Image:
The following bash code defines the steps to build and run the **Flask** API inside a Docker container:

```bash
cd vehicle-sales-backend
docker build -t vehicle-sales-backend .
```

### 2. Setting Up Minikube

Ensure you have **Minikube** installed. If not, follow the [Minikube installation guide](https://minikube.sigs.k8s.io/docs/).

#### Start Minikube:

```bash
minikube start
```

### 3. Load the docker images to be recognised by minikube

This step skips uploading the images to a docker file host (such as DockerHub):

```bash
minikube image load vehicle-sales-backend:latest
minikube image load vehicle-sales-frontend:latest
```

### 4. Apply Kubernetes Configurations

You need to apply the Kubernetes deployment configurations for each service. Having all YAML files are located in a **k8s** directory, you can apply them using the following commands.

#### Apply PostgreSQL Deployment:

- Defines the deployment and service for PostgreSQL, used to store Vehicle Sales data.
- Configures the database with user credentials and exposes it on port `5432`.

```bash
kubectl apply -f k8s/postgresql-deployment.yaml
```

#### Apply Backend Deployment:

- Deploys the Flask API and connects it to the PostgreSQL database via environment variables.
- Exposes the backend API on port `5000`.

```bash
kubectl apply -f k8s/backend-deployment.yaml
```

#### Apply Frontend Deployment:

- Deploys the Next.js application and exposes it on port `3000`.

```bash
kubectl apply -f k8s/frontend-deployment.yaml
```

### 5. Verify the Deployments

You can check the status of the pods and services in the Kubernetes cluster to ensure everything is running correctly.

#### Check the Pods:

```bash
kubectl get pods
```

#### Check the Services:

```bash
kubectl get svc
```

### 6. Expose the Frontend Using Minikube

Once the Frontend is running in the cluster, you need to expose it locally to access the application.

```bash
minikube service vehicle-sales-frontend
```

This will open the frontend service in your default web browser.

### 7. Cleanup (Optional)

Once you're done, you can delete the resources to clean up your Minikube environment.

#### Delete All Kubernetes Resources:

```bash
kubectl delete -f k8s/
```

#### Stop Minikube:

```bash
minikube stop
```