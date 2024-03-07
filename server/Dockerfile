FROM oven/bun:1
WORKDIR /backend
COPY package.json .
RUN bun install
COPY src src
EXPOSE 8158
CMD [ "bun", "src/main.ts" ]
