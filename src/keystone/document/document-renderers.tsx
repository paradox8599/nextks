import { DocumentRendererProps } from "@keystone-6/document-renderer";
import { InferRenderersForComponentBlocks } from "@keystone-6/fields-document/component-blocks";
import { componentBlocks } from "./component-blocks";

export const renderers: DocumentRendererProps["renderers"] = {
  inline: {},
  block: {},
};

export const blockRenderers: InferRenderersForComponentBlocks<
  typeof componentBlocks
> = {
  demo: ({ content }) => {
    return <>{content}</>;
  },
};
