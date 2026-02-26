# Build stage
FROM node:20-alpine AS builder

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install all dependencies (including devDependencies for build)
RUN npm ci

# Copy source code
COPY . .

# Build frontend (generates client/dist/client due to vite root config)
RUN npm run build

# Production stage
FROM node:20-alpine

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install only production dependencies
RUN npm ci --omit=dev

# Copy built frontend from builder (Vite root is 'client', so output is in client/dist/client)
COPY --from=builder /app/client/dist/client ./dist/client

# Copy server code
COPY server ./server

# Copy config files
COPY config ./config

# Create cache directory (will be mounted as volume)
RUN mkdir -p dashboards-data

# Environment variables (defaults)
ENV NODE_ENV=production
ENV PORT=80

# Expose port (can be overridden with PORT env var)
EXPOSE 80

# Health check (using PORT env var)
HEALTHCHECK --interval=30s --timeout=5s --start-period=15s --retries=3 \
  CMD node -e "const port = process.env.PORT || 80; require('http').get('http://localhost:' + port + '/health', (r) => {process.exit(r.statusCode === 200 ? 0 : 1)})"

# Start Express server (serves frontend + API)
CMD ["node", "server/index.js"]
