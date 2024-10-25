import Iron from "@hapi/iron";
import { cookies } from "next/headers";
import PrismaModule from "@prisma/client";
import { getContext } from "@keystone-6/core/context";
import { type Context as KsContext } from ".keystone/types";

import config from "../../keystone";
import { Session } from "./auth";
import ENV from "../env";

export type Context = KsContext & { session?: Session };

type ContextThis = typeof globalThis & { keystoneContext: Context };
const contextThis = globalThis as ContextThis;

// Making sure multiple prisma clients are not created during hot reloading
export const keystoneContext: Context =
  contextThis.keystoneContext ?? getContext(config, PrismaModule);

if (ENV.nodeEnv !== "production") {
  contextThis.keystoneContext = keystoneContext;
}

export async function getSession() {
  const cookie = cookies().get("keystonejs-session");
  if (!cookie) return {};
  const session = await Iron.unseal(
    cookie.value,
    ENV.sessionSecret,
    Iron.defaults,
  );
  return session;
}

export async function getContextWithSession() {
  return keystoneContext.withSession(await getSession());
}
