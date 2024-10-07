import { getContext } from "@keystone-6/core/context";
import config from "../../keystone";
import { type Context as KsContext } from ".keystone/types";
import PrismaModule from "@prisma/client";
import { Session } from "./auth";

export type Context = KsContext & { session?: Session };

type ContextThis = typeof globalThis & { keystoneContext: Context };
const contextThis = globalThis as ContextThis;

// Making sure multiple prisma clients are not created during hot reloading
export const keystoneContext: Context =
  contextThis.keystoneContext ?? getContext(config, PrismaModule);

if (process.env.NODE_ENV !== "production") {
  contextThis.keystoneContext = keystoneContext;
}
