import { DocumentRenderer } from "@keystone-6/document-renderer";
import { type DocumentElement } from "../../lib/types";
import { JsonValue } from "@prisma/client/runtime/library";
import { prepareComponentBlocks, renderers } from "./renderers/_";

type DokumentProps = {
  document: DocumentElement[] | JsonValue;
} & Parameters<typeof prepareComponentBlocks>[0];

export default async function Dokument({ document, ...props }: DokumentProps) {
  const componentBlocks = await prepareComponentBlocks({ ...props });

  return (
    <DocumentRenderer
      document={document as DocumentElement[]}
      componentBlocks={componentBlocks}
      renderers={renderers}
    />
  );
}
