import crypto from "node:crypto";
type DBProvider = "sqlite" | "postgresql" | "mysql";
const dbProviders: DBProvider[] = ["sqlite", "postgresql", "mysql"];

// Database

/// use || instead of ?? to avoid empty string
const databaseUrl =
  process.env.DATABASE_URL || `file:${process.cwd()}/keystone.db`;

const fallbackDbProvider: DBProvider =
  dbProviders.find((p) => databaseUrl.startsWith(p)) ?? "sqlite";

const dbProvider: DBProvider =
  dbProviders.find((p) => p === process.env.DB_PROVIDER) ?? fallbackDbProvider;

// S3 storage

const hasStorage =
  process.env.S3_BUCKET_NAME &&
  process.env.S3_ENDPOINT &&
  process.env.S3_ACCESS_KEY_ID &&
  process.env.S3_SECRET_ACCESS_KEY;

// Final ENV

const ENV = {
  nodeEnv: process.env.NODE_ENV ?? "development",

  sessionSecret:
    process.env.SESSION_SECRET ?? crypto.randomBytes(32).toString("hex"),

  dbProvider,
  databaseUrl,

  s3: hasStorage
    ? {
        bucketName: process.env.S3_BUCKET_NAME!,
        accessKeyId: process.env.S3_ACCESS_KEY_ID!,
        secretAccessKey: process.env.S3_SECRET_ACCESS_KEY!,
        endpoint: process.env.S3_ENDPOINT!,
        expiry: process.env.S3_EXPIRY
          ? Number.parseInt(process.env.S3_EXPIRY)
          : void 0,
      }
    : void 0,
};

export default ENV;
