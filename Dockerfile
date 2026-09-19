# Use lightweight Node 20 LTS image
FROM node:20-alpine

# Set working directory inside container
WORKDIR /app

# Copy dependency manifests first for cached layer building
COPY package*.json ./

# Install dependencies cleanly
RUN npm ci

# Copy application source files
COPY . .

# Build Vite static production bundle
RUN npm run build

# Expose Vite preview port (8000) and Node API/WS port (8008)
EXPOSE 8000 8008

# Start the Node server & Vite preview orchestrator
CMD ["npm", "start"]
