FROM node:20 as build
WORKDIR /frontend
COPY /frontend/package.json /frontend/angular.json /frontend/server.ts /frontend/tsconfig.app.json /frontend/tsconfig.json ./
RUN npm install
COPY /frontend/src src
RUN npm run build

FROM node:20
WORKDIR /livelyco
COPY --from=build /frontend/dist/livelyco/ ./
CMD [ "node", "./server/server.mjs" ]
