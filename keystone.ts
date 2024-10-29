import { config } from "@keystone-6/core";
import ENV from "./src/env";
import { ksPath } from "./next.config.mjs";
import { lists } from "./src/keystone/schema/_schema";
import { session, withAuth } from "./src/keystone/auth";

export default withAuth(
  config({
    ui: { basePath: `/${ksPath}` },
    db: {
      provider: ENV.dbProvider,
      url: ENV.databaseUrl,
      // onConnect: async (context: Context) => {
      //   if (ENV.nodeEnv !== "production") {
      //     // seed
      //   }
      // },
    },
    storage: ENV.s3
      ? {
          default: {
            kind: "s3",
            type: "file",
            region: "auto",
            bucketName: ENV.s3.bucketName,
            accessKeyId: ENV.s3.accessKeyId,
            secretAccessKey: ENV.s3.secretAccessKey,
            endpoint: ENV.s3.endpoint,
            signed: ENV.s3.expiry ? { expiry: ENV.s3.expiry } : void 0,
          },
        }
      : void 0,
    lists,
    session,
  }),
);
