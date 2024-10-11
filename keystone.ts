import { config } from "@keystone-6/core";
import { lists } from "./src/keystone/schema/_schema";
import { session, withAuth } from "./src/keystone/auth";

const provider =
  (process.env.DB_PROVIDER as "postgresql" | "sqlite") ||
  (process.env.DATABASE_URL?.startsWith("postgresql")
    ? "postgresql"
    : "sqlite");

export default withAuth(
  config({
    ui: { basePath: "/admin" },
    db: {
      provider,
      url: process.env.DATABASE_URL || `file:${process.cwd()}/keystone.db`,
      // onConnect: async (context: Context) => {
      //   if (process.env.NODE_ENV !== "production") {
      //     // seed
      //   }
      // },
    },
    lists,
    session,
  }),
);
