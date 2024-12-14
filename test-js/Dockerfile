# Step 1: Use the official Node.js image as the base image
FROM node:16

# Step 2: Set the working directory inside the container
WORKDIR /app

# Step 3: Copy the package.json and package-lock.json (if they exist)
COPY package*.json ./

# Step 4: Install dependencies (axios in this case)
RUN npm init -y
RUN npm install
RUN npm install axios
COPY package*.json ./

# Step 5: Copy the rest of the application files to the container
COPY . .

# Step 6: Set the command to run the app
CMD ["node", "test.js"]