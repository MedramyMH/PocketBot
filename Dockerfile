FROM node:20-alpine

# Cache busting - forces fresh Docker build
ARG CACHE_BUST=1

# Install Python for microservice
RUN apk add --no-cache python3 py3-pip

# Install Python dependencies
# po_service.py uses aiohttp
RUN pip3 install --break-system-packages aiohttp # <-- THE FIX

# Set working directory
WORKDIR /app

# Copy package files
COPY package.json package-lock.json ./

# Install ALL dependencies (including dev for build )
RUN npm install

# Copy application files - will not use cache due to ARG
COPY . .

# Build the application
RUN npm run build

# Remove dev dependencies for smaller image
RUN npm prune --production

# Expose port
EXPOSE 8080

# Start application
CMD ["npm", "run", "start"]
