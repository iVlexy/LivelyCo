FROM node:20 as build
WORKDIR /frontend
COPY /frontend/package.json ./
RUN npm install
COPY /frontend/angular.json /frontend/server.ts /frontend/tsconfig.app.json /frontend/tsconfig.json ./
COPY /frontend/src src
RUN npm run build-staging

FROM node:20-slim

RUN useradd -ms /bin/bash lively
USER lively
WORKDIR /home/lively
RUN npm install -g bun

WORKDIR /home/lively/backend
COPY ./server/package.bun.json ./package.json
RUN bun install
COPY ./server/src src

WORKDIR /home/lively/frontend
COPY --from=build /frontend/dist/livelyco/ ./

ENV PROD=true
WORKDIR /home/lively
COPY --chmod=u+x --chown=lively:lively entry.sh entry.sh
EXPOSE 8148
EXPOSE 8147
ENTRYPOINT [ "bash", "/home/lively/entry.sh" ]
