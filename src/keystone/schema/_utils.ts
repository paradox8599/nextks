import { relationship, timestamp } from "@keystone-6/core/fields";
import { BaseListTypeInfo } from "@keystone-6/core/types";
import { Context } from "../context";

export function createdAtField<T extends BaseListTypeInfo>() {
  return timestamp<T>({
    defaultValue: { kind: "now" },
    validation: { isRequired: true },
    ui: {
      createView: { fieldMode: "hidden" },
      itemView: { fieldMode: "read", fieldPosition: "sidebar" },
    },
  });
}

export function updatedAtField<T extends BaseListTypeInfo>() {
  return timestamp<T>({
    defaultValue: { kind: "now" },
    validation: { isRequired: true },
    db: { updatedAt: true },
    ui: {
      createView: { fieldMode: "hidden" },
      itemView: { fieldMode: "read", fieldPosition: "sidebar" },
    },
  });
}

export function manyRef<T extends BaseListTypeInfo>(name: string) {
  return relationship<T>({
    ref: name,
    many: true,
    ui: {
      createView: { fieldMode: "hidden" },
      // itemView: { fieldMode: "read" },
    },
  });
}

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
