import { relationship, timestamp } from "@keystone-6/core/fields";
import { BaseListTypeInfo } from "@keystone-6/core/types";
import { IncomingStatus } from "../../types";
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

export enum StockAction {
  Add = 1,
  Sub = -1,
  None = 0,
}

type IncomingActions = {
  inHand: StockAction;
  incoming: StockAction;
  planned: StockAction;
};

export const INCOMING_ITEM_ACTIONS = {
  // stock actions for creating incoming with status
  create: {
    [IncomingStatus.Planned]: {
      inHand: StockAction.None,
      incoming: StockAction.None,
      planned: StockAction.Add,
    },
    [IncomingStatus.Incoming]: {
      inHand: StockAction.None,
      incoming: StockAction.Add,
      planned: StockAction.None,
    },
    [IncomingStatus.Arrived]: {
      inHand: StockAction.Add,
      incoming: StockAction.None,
      planned: StockAction.None,
    },
  },

  // stock actions for updating incoming with status
  update: {
    [IncomingStatus.Planned]: {
      inHand: StockAction.None,
      incoming: StockAction.None,
      planned: StockAction.Add,
    },
    [IncomingStatus.Incoming]: {
      inHand: StockAction.None,
      incoming: StockAction.Add,
      planned: StockAction.None,
    },
    [IncomingStatus.Arrived]: {
      inHand: StockAction.Add,
      incoming: StockAction.None,
      planned: StockAction.None,
    },
  },

  // stock actions for deleting incoming with status
  delete: {
    [IncomingStatus.Planned]: {
      inHand: StockAction.None,
      incoming: StockAction.None,
      planned: StockAction.Sub,
    },
    [IncomingStatus.Incoming]: {
      inHand: StockAction.None,
      incoming: StockAction.Sub,
      planned: StockAction.None,
    },
    [IncomingStatus.Arrived]: {
      inHand: StockAction.Sub,
      incoming: StockAction.None,
      planned: StockAction.None,
    },
  },
};

// INCOMING_UPDATE_ACTIONS[previous status][current status]
export const INCOMING_UPDATE_ACTIONS: Record<
  IncomingStatus,
  Record<IncomingStatus, IncomingActions>
> = {
  [IncomingStatus.Planned]: {
    [IncomingStatus.Incoming]: {
      inHand: StockAction.None,
      incoming: StockAction.Add,
      planned: StockAction.Sub,
    },
    [IncomingStatus.Planned]: {
      inHand: StockAction.None,
      incoming: StockAction.None,
      planned: StockAction.None,
    },
    [IncomingStatus.Arrived]: {
      inHand: StockAction.Add,
      incoming: StockAction.None,
      planned: StockAction.Sub,
    },
  },

  [IncomingStatus.Incoming]: {
    [IncomingStatus.Incoming]: {
      inHand: StockAction.None,
      incoming: StockAction.None,
      planned: StockAction.None,
    },
    [IncomingStatus.Planned]: {
      inHand: StockAction.None,
      incoming: StockAction.Sub,
      planned: StockAction.Add,
    },
    [IncomingStatus.Arrived]: {
      inHand: StockAction.Add,
      incoming: StockAction.Sub,
      planned: StockAction.None,
    },
  },

  [IncomingStatus.Arrived]: {
    [IncomingStatus.Incoming]: {
      inHand: StockAction.Sub,
      incoming: StockAction.Add,
      planned: StockAction.None,
    },
    [IncomingStatus.Planned]: {
      inHand: StockAction.Sub,
      incoming: StockAction.None,
      planned: StockAction.Add,
    },
    [IncomingStatus.Arrived]: {
      inHand: StockAction.None,
      incoming: StockAction.None,
      planned: StockAction.None,
    },
  },
};

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
