import { Context } from "../context";

export function isInTransaction(context: Context) {
  return undefined === context.prisma.$transaction;
}

export async function transaction<T>(
  context: Context,
  fn: (ctx: Context) => Promise<T>,
) {
  if (isInTransaction(context)) {
    return await fn(context);
  } else {
    return await context.transaction<T>(fn);
  }
}
