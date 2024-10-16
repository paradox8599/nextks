import { config } from "@keystone-6/core";
import { lists } from "./src/keystone/schema/_schema";
import { session, withAuth } from "./src/keystone/auth";
import ENV from "./src/env";

export default withAuth(
  config({
    ui: { basePath: "/admin" },
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
