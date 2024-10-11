# Next.js + Keystone Web App

## Getting Started

### Prerequisites

- NodeJS: ^20.17.0
- [Bun](https://bun.sh/)

### Installation

- `bun install`

### Development

- NextJS: `npm run dev:nx`
  - It starts a Next.js app on http://localhost:4000, and KeystoneJS GraphQL API will be available on http://localhost:4000/api/graphql
- Keystone Admin UI: `npm run dev:ks`
  - http://localhost:3000

### Migration

- `npm run migrate`: [Database Migration](https://keystonejs.com/docs/guides/database-migration)

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
- KeystoneJS Admin UI Custom Pages: [admin/pages](admin/pages/x/index.tsx) with [Pages Router](https://nextjs.org/docs/pages)
  - using `/x` as path prefix to avoid conflicts with keystone generated paths

### Data & API

#### GraphQL Client

- [src/keystone/graphql.ts](src/keystone/graphql.ts)

#### Server Context

- [src/keystone/context.ts](src/keystone/context.ts)
  - [NextJS Route Handlers](https://nextjs.org/docs/app/building-your-application/routing/route-handlers)
  - [Server Actions](https://nextjs.org/docs/app/building-your-application/data-fetching/server-actions-and-mutations)

## Docs

- App: [Next.js](https://nextjs.org/)
- CMS: [KeystoneJS](https://keystonejs.com/)
- Style: [TailwindCSS](https://tailwindcss.com/)
- Data Fetching: [SWR](https://swr.vercel.app/)
- Data Processing: [Lodash](https://lodash.com/)
- State Management: [Valtio](https://github.com/pmndrs/valtio)
