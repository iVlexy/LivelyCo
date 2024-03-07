FROM node:20 as build
WORKDIR /frontend
COPY /frontend/package.json ./
RUN npm install
COPY /frontend/angular.json /frontend/server.ts /frontend/tsconfig.app.json /frontend/tsconfig.json ./
COPY /frontend/src src
RUN npm run build-staging

FROM node:20

RUN apt-get update && apt-get install unzip curl && rm -rf /var/lib/apt/lists/*
RUN curl -fsSL https://bun.sh/install | bash
RUN ln -s /root/.bun/bin/bun /bin/bun

WORKDIR /livelyco/backend
COPY ./server/package.json ./
RUN bun install
COPY ./server/src src

WORKDIR /livelyco/frontend
COPY --from=build /frontend/dist/livelyco/ ./

ENV PROD=true
WORKDIR /livelyco
COPY --chmod=ugo+rx entry.sh entry.sh
ENTRYPOINT [ "./entry.sh" ]
