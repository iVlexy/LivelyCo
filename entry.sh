#!/bin/sh

node /livelyco/frontend/server/server.mjs &

cd /livelyco/backend
bun ./src/main.ts
