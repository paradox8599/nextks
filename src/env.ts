import crypto from "node:crypto";
type DBProvider = "sqlite" | "postgresql" | "mysql";
const dbProviders: DBProvider[] = ["sqlite", "postgresql", "mysql"];

// use || instead of ?? to avoid empty string
const databaseUrl =
  process.env.DATABASE_URL || `file:${process.cwd()}/keystone.db`;

const fallbackDbProvider: DBProvider =
  dbProviders.find((p) => databaseUrl.startsWith(p)) ?? "sqlite";

const dbProvider: DBProvider =
  dbProviders.find((p) => p === process.env.DB_PROVIDER) ?? fallbackDbProvider;

const ENV = {
  nodeEnv: process.env.NODE_ENV ?? "development",
  sessionSecret:
    process.env.SESSION_SECRET ?? crypto.randomBytes(32).toString("hex"),
  dbProvider,
  databaseUrl,
};

export default ENV;
