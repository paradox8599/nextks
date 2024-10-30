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
          default_image: {
            kind: "s3",
            type: "image",
            region: "auto",
            signed: ENV.s3.expiry,
            endpoint: ENV.s3.endpoint,
            bucketName: ENV.s3.bucketName,
            accessKeyId: ENV.s3.accessKeyId,
            secretAccessKey: ENV.s3.secretAccessKey,
            pathPrefix: "images/",
          },
          default_file: {
            kind: "s3",
            type: "file",
            region: "auto",
            signed: ENV.s3.expiry,
            endpoint: ENV.s3.endpoint,
            bucketName: ENV.s3.bucketName,
            accessKeyId: ENV.s3.accessKeyId,
            secretAccessKey: ENV.s3.secretAccessKey,
            pathPrefix: "files/",
          },
        }
      : void 0,
    lists,
    session,
  }),
);
