# frontend/Dockerfile

# Use an official lightweight Node.js image
FROM node:18-alpine

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json first
# This leverages Docker's caching: if your dependencies haven't changed,
# Docker skips the slow 'npm install' step on subsequent builds.
COPY package.json package-lock.json ./

# Install dependencies
RUN npm install

# Copy the rest of your React app code
COPY . .

# Expose the port React runs on
EXPOSE 3000

# Start the development server
CMD ["npm", "start"]