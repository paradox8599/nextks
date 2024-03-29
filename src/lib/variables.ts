import { randomBytes } from "crypto";

try {
  require("dotenv").config();
} catch (e) { }

// KeystoneJS server config
type DB_PROVIDER_TYPE = "sqlite" | "mysql" | "postgresql";

export const KS_PORT = parseInt(process.env.KS_PORT || "3000");

export const SESSION_SECRET =
  process.env.SESSION_SECRET || randomBytes(32).toString("hex");

export const DB_PROVIDER: DB_PROVIDER_TYPE =
  (process.env.DB_PROVIDER as DB_PROVIDER_TYPE) || "sqlite";

export const DATABASE_URL = process.env.DATABASE_URL || "file://keystone.db";

// KeystoneJS & GraphQL Server
export const SERVER_URL = new URL(
  process.env.NEXT_PUBLIC_SERVER_URL ?? "http://locahost:3000",
);

export const GRAPHQL_PATH =
  process.env.NEXT_PUBLIC_GRAPHQL_PATH ?? "/api/graphql";

export const GRAPHQL_ENDPOINT = new URL(GRAPHQL_PATH, SERVER_URL);

export const BUCKET = {
  name: process.env.AWS_BUCKET ?? "",
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  endpointUrl: process.env.AWS_ENDPOINT_URL,
  customUrl: process.env.AWS_CUSTOM_URL,
};
