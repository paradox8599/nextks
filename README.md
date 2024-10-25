# Next.js + Keystone Web App

## Getting Started

### Prerequisites

- NodeJS: ^20.17.0
- [Bun](https://bun.sh/)

### Installation

- `bun install`

### Development

- NextJS: `bun run dev:nx`
  - It starts a Next.js app on http://localhost:4000, and KeystoneJS GraphQL API will be available on http://localhost:4000/api/graphql
- Keystone Admin UI: `bun run dev:ks`
  - http://localhost:3000

### Migration

- `bun run migrate`: [Database Migration](https://keystonejs.com/docs/guides/database-migration)

### Deploy

- put a single line of PostgresQL URL text in `secret-db_url_prod.txt`
- Build with command: `docker build --build-arg "DATABASE_URL=$(cat secret-database_url.txt)" .`
- Deploy on [fly.io](https://fly.io)
  - Create fly app: `fly app create <app name>`
  - Set env: `fly secrets set DATABASE_URL=$(cat secret-db_url_prod.txt)`
  - `bun run deploy`
- Github Actions
  - secrets: `FLY_API_TOKEN`, `DATABASE_URL`

## Pages & APIs

### Frontend

- NextJS Entry Page: [src/app/page.tsx](src/app/page.tsx)
- KeystoneJS Admin UI Custom Pages: [admin/pages/custom](admin/pages/custom/index.tsx)
  - using `/custom` as path prefix to avoid conflicts with keystone generated paths
- KeystonJS Custom NextJS Pages [admin/pages/custom](admin/pages/custom/index.tsx) with [Pages Router](https://nextjs.org/docs/pages)

### Data & API

#### GraphQL Client

- [src/keystone/graphql.ts](src/keystone/graphql.ts)

#### Server Context

- [src/keystone/context.ts](src/keystone/context.ts)
  - [NextJS Route Handlers](https://nextjs.org/docs/app/building-your-application/routing/route-handlers)
  - [Server Actions](https://nextjs.org/docs/app/building-your-application/data-fetching/server-actions-and-mutations)
    - use [getContextWithSession()](src/keystone/context.ts) to get context with user session

## Notes

- `@prisma/client` needs to stay at `5.19.0` for keystone to run

## Docs

- App: [Next.js](https://nextjs.org/)
- CMS: [KeystoneJS](https://keystonejs.com/)
- Style: [TailwindCSS](https://tailwindcss.com/)
- Data Fetching: [SWR](https://swr.vercel.app/)
- Data Processing: [Lodash](https://lodash.com/)
- State Management: [Valtio](https://github.com/pmndrs/valtio)

## Other Readings

- [Add support for developers to replace the default esbuild configuration #9235](https://github.com/keystonejs/keystone/pull/9235)
- [Configure Prisma Client with PgBouncer](https://www.prisma.io/docs/orm/prisma-client/setup-and-configuration/databases-connections/pgbouncer)
