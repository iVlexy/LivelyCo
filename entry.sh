#!/bin/bash

cd /home/lively/frontend
node server/server.mjs &

cd /home/lively/backend
bun src/main.ts
