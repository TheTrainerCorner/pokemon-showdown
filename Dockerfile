FROM node:20-slim

# Install build tools required for native modules (better-sqlite3)
RUN apt-get update && apt-get install -y \
    python3 \
    make \
    g++ \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /app

# Install dependencies without running postinstall (build needs source files)
COPY package*.json ./
RUN npm ci --ignore-scripts

# Copy source and build
COPY . .
RUN npm run build

# Remove dev dependencies
RUN npm prune --production

RUN mkdir -p /app/logs

EXPOSE 8000

CMD ["node", "pokemon-showdown", "start"]
