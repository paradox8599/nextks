FROM node:20 AS base
WORKDIR /app
ARG DATABASE_URL
ENV DB_PROVIDER=postgresql
ENV DATABASE_URL=${DATABASE_URL}
ENV TZ=Australia/Sydney
COPY package.json package.json
COPY package-lock.json package-lock.json
COPY .env .env
RUN touch .env.local

FROM base AS build
RUN npm ci --ignore-scripts
COPY . .
RUN \
  npx keystone postinstall --fix \
  && npx keystone build \
  && npx next build

ENV NODE_ENV=production

EXPOSE 3000 4000

CMD [ "tail", "-f", "/dev/null" ]
