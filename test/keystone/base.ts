import _ from "lodash";
import path from "path";
import { beforeEach } from "@jest/globals";
import { getContext } from "@keystone-6/core/context";
import { resetDatabase } from "@keystone-6/core/testing";
import * as PrismaModule from "@prisma/client";
import { Session } from "@/keystone/auth";
import { randEmail, randFullName } from "@ngneat/falso";
import { config as ksConfig } from "@keystone-6/core";
import { lists } from "../../src/keystone/schema/_schema";
import { session, withAuth } from "../../src/keystone/auth";

const prismaSchemaPath = path.join(__dirname, "../../schema.prisma");

export function ksPrepareTest(key: string) {
  const url = process.env.DATABASE_URL || `file:./test-keystone-${key}.db`;

  const config = withAuth(
    ksConfig({
      db: {
        provider: url.startsWith("postgresql") ? "postgresql" : "sqlite",
        url,
      },
      lists,
      session,
    }),
  );

  async function getSession({ isAdmin = false }: { isAdmin?: boolean }) {
    const me = (
      await ctx
        .sudo()
        .db.User.findMany({ where: { isAdmin: { equals: isAdmin } } })
    )[0];
    const session: Session = {
      itemId: me.id,
      listKey: "User",
      data: _.omit(me, "id", "password"),
    };
    const query = ctx.withSession(session).query;
    return { session, query };
  }

  const ctx = getContext(config, PrismaModule);

  beforeEach(async () => {
    await resetDatabase(url, prismaSchemaPath);
    const staffEmail = randEmail();
    await ctx.sudo().db.User.createMany({
      data: [
        {
          name: "Admin",
          email: "admin@me.com",
          password: "admin@me.com",
          isAdmin: true,
        },
        { name: randFullName(), email: staffEmail, password: staffEmail },
      ],
    });
  });

  return { ctx, getSession };
}
