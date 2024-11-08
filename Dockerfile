FROM node:22 AS base

WORKDIR /app

ARG DATABASE_URL
ENV DATABASE_URL=${DATABASE_URL}
ENV TZ=Australia/Sydney

COPY package.json package.json
COPY bun.lockb bun.lockb
COPY .env .env

RUN npm i -g bun@1.1.34 \
  && bun i --frozen-lockfile --ignore-scripts 

# install extra packages
# && apt-get update -y \
# && apt-get install -y --no-install-recommends openssl=3.0.14-1~deb12u2 \
# && rm -rf /var/lib/apt/lists/*

FROM base AS build

COPY . .

ENV NODE_ENV=production

RUN \
  bunx keystone postinstall --fix \
  && bunx keystone build \
  && bunx next build


EXPOSE 3000 4000

CMD [ "tail", "-f", "/dev/null" ]
