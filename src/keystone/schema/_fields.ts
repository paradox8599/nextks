import { relationship, timestamp } from "@keystone-6/core/fields";
import { document } from "@keystone-6/fields-document";
import { BaseListTypeInfo } from "@keystone-6/core/types";
import { componentBlocks } from "../document/component-blocks";

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

export function dokument<T extends BaseListTypeInfo>() {
  return document<T>({
    formatting: true,
    dividers: true,
    links: true,
    ui: { views: "./src/keystone/document/component-blocks" },
    componentBlocks,
  });
}
