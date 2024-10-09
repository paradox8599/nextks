FROM node:20 AS base
WORKDIR /app
ARG DATABASE_URL
ENV DB_PROVIDER=postgresql
ENV DATABASE_URL=${DATABASE_URL}
ENV TZ=Australia/Sydney
COPY package.json package.json
COPY bun.lockb bun.lockb
COPY .env .env
RUN npm i -g bun@1.1.29 \
  && bun i --frozen-lockfile --ignore-scripts

FROM base AS build
COPY . .
RUN \
  bunx keystone postinstall --fix \
  && bunx keystone build \
  && bunx next build

ENV NODE_ENV=production

EXPOSE 3000 4000

CMD [ "tail", "-f", "/dev/null" ]
