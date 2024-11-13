"use client";
import {
  NotEditable,
  component,
  fields,
} from "@keystone-6/fields-document/component-blocks";

export const blockDemo = component({
  label: "demo",
  chromeless: true,
  schema: {
    content: fields.child({
      kind: "inline",
      placeholder: "demo...",
      formatting: { inlineMarks: "inherit", softBreaks: "inherit" },
      links: "inherit",
    }),
  },
  preview: (props) => (
    <div>
      <div>
        <NotEditable>demo</NotEditable>
      </div>
      <div>{props.fields.content.element}</div>
    </div>
  ),
});
