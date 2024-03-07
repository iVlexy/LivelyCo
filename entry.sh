#!/usr/bin/env sh

cd /livelyco

node ./frontend/server/server.mjs &

cd backend
bun ./src/main.ts
