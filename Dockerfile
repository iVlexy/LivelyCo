#### Frontend Build Step ####
FROM node:20 as build
WORKDIR /basics

# Install Frontend Dependencies
COPY basics/package.json package.json
RUN npm install

# Build frontend code
COPY basics .
RUN npm run build


#### Server Build Step ####
FROM oven/bun:1
WORKDIR /backend

# Install backend dependencies
COPY server/package.json package.json
RUN bun install

# Copy Frontend Build
COPY --from=build /basics/dist/basics ./public/

# Copy server files
COPY server/src src

# Server Setup
ENV PORT=8156
EXPOSE 8156
CMD [ "bun", "src/main.ts" ]
