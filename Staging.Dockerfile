FROM node:20 as build
WORKDIR /frontend
COPY /frontend/package.json ./
RUN npm install
COPY /frontend/angular.json /frontend/server.ts /frontend/tsconfig.app.json /frontend/tsconfig.json ./
COPY /frontend/src src
RUN npm run build-staging

FROM node:20-bullseye-slim

RUN apt-get update -y && apt-get install unzip curl -y && rm -rf /var/lib/apt/lists/*
RUN useradd -ms /bin/bash lively
USER lively
WORKDIR /home/lively
RUN curl -fsSL https://bun.sh/install | bash
ENV PATH="${PATH}:/home/lively/.bun/bin"

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
ENTRYPOINT [ "./entry.sh" ]
