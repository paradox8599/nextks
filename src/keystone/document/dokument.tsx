import { DocumentRenderer } from "@keystone-6/document-renderer";
import { type Element } from "@/lib/types";
import { blockRenderers, renderers } from "./document-renderers";

export default function Dokument({ document }: { document: Element[] }) {
  return (
    <DocumentRenderer
      document={document}
      componentBlocks={blockRenderers}
      renderers={renderers}
    />
  );
}
