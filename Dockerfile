## file is used to deploy to clould run
#
## Use an official Node.js runtime as a parent image
#FROM node:16-slim
#
## Set the working directory in the container
#WORKDIR /app
#
## Copy package.json and package-lock.json
#COPY package*.json ./
#
## Install dependencies
#RUN npm install
#
## Copy the rest of the application code
#COPY . .
#
## Build the app
#RUN npm run build
#
## Use a lightweight web server to serve the static files
#RUN npm install -g serve
#
## Expose the port on which the app will run
#EXPOSE 8080
#
## Start the app
#CMD ["serve", "-s", "build", "-l", "8080"]

# Use an official Node.js runtime as a parent image
FROM node:16-alpine

# Install necessary packages for Puppeteer/Chromium
RUN apk add --no-cache \
    chromium \
    nss \
    freetype \
    harfbuzz \
    ca-certificates \
    ttf-freefont \
    nodejs \
    yarn

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Build the app
RUN PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=true npm run build

# Install serve to serve the static files
RUN npm install -g serve

# Expose the port on which the app will run
EXPOSE 8080

# Specify environment variable to use the installed Chromium
ENV PUPPETEER_EXECUTABLE_PATH=/usr/bin/chromium-browser

# Start the app
CMD ["serve", "-s", "build", "-l", "8080"]