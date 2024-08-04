# Use an official Node.js runtime as a parent image
FROM node:16-alpine

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json
#COPY package*.json ./

# Install dependencies
RUN #npm install

# Copy the rest of the application code
COPY . .

# Build the app
# RUN npm run build

# Use a lightweight web server to serve the static files
RUN npm install -g serve

# Expose the port on which the app will run
EXPOSE 8888

# Start the app
CMD ["serve", "-s", "./", "-l", "8888"]