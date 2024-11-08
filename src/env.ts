import crypto from "node:crypto";
type DBProvider = "sqlite" | "postgresql" | "mysql";
const dbProviders: DBProvider[] = ["sqlite", "postgresql", "mysql"];

// Database

/// use || instead of ?? to handle empty string
const databaseUrl =
  process.env.DATABASE_URL || `file:${process.cwd()}/keystone.db`;

const dbProvider: DBProvider =
  dbProviders.find((p) => process.env.DB_PROVIDER === p) ??
  dbProviders.find((p) => databaseUrl.startsWith(p)) ??
  "sqlite";

// Final ENV

const ENV = {
  nodeEnv: process.env.NODE_ENV ?? "development",

  sessionSecret:
    process.env.SESSION_SECRET ?? crypto.randomBytes(32).toString("hex"),

  dbProvider,
  databaseUrl,

  s3: (() => {
    const hasStorage =
      process.env.S3_BUCKET_NAME &&
      process.env.S3_ENDPOINT &&
      process.env.S3_ACCESS_KEY_ID &&
      process.env.S3_SECRET_ACCESS_KEY;
    if (!hasStorage) return void 0;

    return {
      bucketName: process.env.S3_BUCKET_NAME!,
      accessKeyId: process.env.S3_ACCESS_KEY_ID!,
      secretAccessKey: process.env.S3_SECRET_ACCESS_KEY!,
      endpoint: process.env.S3_ENDPOINT!,
      expiry: (() => {
        const r = (v: number = 3600) => ({ expiry: v });
        const env = process.env.S3_EXPIRY_SECONDS;
        if (!env) return r();
        const expiry = Number.parseInt(process.env.S3_EXPIRY_SECONDS!);
        return Number.isNaN(expiry) ? r() : r(expiry);
      })(),
    };
  })(),
};

console.log(ENV);

export default ENV;
