import { DocumentRendererProps } from "@keystone-6/document-renderer";
import { Context } from "../../context";
import {} from "@prisma/client";
import { InferRenderersForComponentBlocks } from "@keystone-6/fields-document/component-blocks";
import { componentBlocks } from "../blocks/_";

export const renderers: DocumentRendererProps["renderers"] = {
  inline: {},
  block: {},
};

export async function prepareComponentBlocks({}: { context: Context }) {
  const blockRenderers: InferRenderersForComponentBlocks<
    typeof componentBlocks
  > = {
    demo: ({ content }) => <div>{content}</div>,
  };

  return blockRenderers;
}
