#!/usr/bin/env bash

node /livelyco/frontend/server/server.mjs &

cd /livelyco/backend
bun ./src/main.ts
