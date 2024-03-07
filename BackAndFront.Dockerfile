FROM node:20 as build
WORKDIR /frontend
COPY /frontend/package.json ./
RUN npm install
COPY /frontend/angular.json /frontend/server.ts /frontend/tsconfig.app.json /frontend/tsconfig.json ./
COPY /frontend/src src
RUN npm run build

FROM node:20

RUN apt-get update && apt-get install unzip curl && rm -rf /var/lib/apt/lists/*
RUN useradd -ms /bin/bash lively
USER lively
WORKDIR /home/lively
RUN curl -fsSL https://bun.sh/install | bash
ENV PATH="${PATH}:/home/lively/.bun/bin"

WORKDIR /home/lively/backend
COPY ./server/package.json ./
RUN bun install
COPY ./server/src src

WORKDIR /home/lively/frontend
COPY --from=build /frontend/dist/livelyco/ ./

ENV PROD=true
WORKDIR /home/lively
COPY entry.sh entry.sh
RUN chmod ugo+rx entry.sh
ENTRYPOINT [ "./entry.sh" ]
