import { exec } from "node:child_process";
import fs from "node:fs/promises";
import { promisify } from "node:util";
import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import dayjs from "dayjs";

const execAsync = promisify(exec);

// Configuration
const DATABASE_URL = process.env.DATABASE_URL!;
const DUMP_FILE_NAME = `dump_${dayjs().format("YYYY-MM-DD_HH-mm-ss")}.sql`;
const R2_BUCKET_NAME = process.env.R2_BUCKET_NAME!;
const R2_ACCOUNT_ID = process.env.R2_ACCOUNT_ID!;
const R2_ACCESS_KEY_ID = process.env.R2_ACCESS_KEY_ID!;
const R2_SECRET_ACCESS_KEY = process.env.R2_SECRET_ACCESS_KEY!;

async function runPgDump() {
  const command = `pg_dump "${DATABASE_URL}" > ${DUMP_FILE_NAME}`;

  try {
    await execAsync(command);
    console.log("Database dump created successfully.");
  } catch (error) {
    console.error("Error creating database dump:", error);
    process.exit(1);
  }
}

async function uploadToR2() {
  const client = new S3Client({
    region: "auto",
    endpoint: `https://${R2_ACCOUNT_ID}.r2.cloudflarestorage.com`,
    credentials: {
      accessKeyId: R2_ACCESS_KEY_ID,
      secretAccessKey: R2_SECRET_ACCESS_KEY,
    },
  });

  const fileContent = await fs.readFile(DUMP_FILE_NAME);

  const command = new PutObjectCommand({
    Bucket: R2_BUCKET_NAME,
    Key: DUMP_FILE_NAME,
    Body: fileContent,
  });

  try {
    await client.send(command);
    console.log("Database dump uploaded to R2 successfully.");
  } catch (error) {
    console.error("Error uploading to R2:", error);
    process.exit(1);
  }
}

export async function pgDump() {
  await runPgDump();
  await uploadToR2();

  // Clean up the local dump file
  await fs.unlink(DUMP_FILE_NAME);
  console.log("Local dump file removed.");
}
