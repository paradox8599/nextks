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
    lists,
    session,
  }),
);
