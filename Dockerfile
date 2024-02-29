#### Frontend Build Step ####
FROM node:20 as build
WORKDIR /frontend

# Install Frontend Dependencies
COPY frontend/package.json package.json
RUN npm install

# Build frontend code
COPY frontend ./
RUN npm run build


##### Server Build Step ####
FROM oven/bun:1
WORKDIR /backend

# Install backend dependencies
ADD server/package.json .
RUN bun install

# Copy Frontend Build
COPY --from=build /frontend/dist/livelyco ./public/

# Copy server files
COPY server/src src

# Server Setup
EXPOSE 8156
CMD [ "bun", "src/main.ts" ]
