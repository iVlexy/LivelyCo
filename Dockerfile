FROM node:20 as build
WORKDIR /frontend
COPY /frontend/package.json /frontend/angular.json /frontend/server.ts /frontend/tsconfig.app.json /frontend/tsconfig.json ./
RUN npm install --legacy-peer-deps
COPY /frontend/src src
RUN npm run build

FROM imbios/bun-node

RUN useradd -ms /bin/bash lively
USER lively
WORKDIR /home/lively

WORKDIR /home/lively/backend
COPY ./server/package.bun.json ./package.json
RUN bun install
COPY ./server/src src

WORKDIR /home/lively/frontend
COPY --from=build /frontend/dist/livelyco/ ./

ENV PROD=true
WORKDIR /home/lively
COPY --chmod=u+x --chown=lively:lively entry.sh entry.sh
EXPOSE 8157
EXPOSE 8158
ENTRYPOINT [ "bash", "/home/lively/entry.sh" ]
