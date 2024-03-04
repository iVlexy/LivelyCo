FROM oven/bun:1

COPY --from=docker:dind /usr/local/bin/docker /usr/local/bin/

RUN apt-get update \
 && apt-get install -y --no-install-recommends git \
 && rm -rf /var/lib/apt/lists/*

WORKDIR /webhook
COPY package.json .
RUN bun install
COPY main.ts .
EXPOSE 8111
CMD [ "bun", "main.ts" ]
