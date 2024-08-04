# Use an official Node.js runtime as a parent image
FROM node:18-alpine3.17

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

RUN npm cache clean --force

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Build the app
RUN npm run build

# Use a lightweight web server to serve the static files
RUN npm install -g http-server

# Expose the port on which the app will run
EXPOSE 8080

# Start the app
CMD ["http-server", "dist", "-p", "8080", "-a", "0.0.0.0"]