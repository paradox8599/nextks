import React from "react";
import { CellComponent, FieldProps } from "@keystone-6/core/types";
import { FieldContainer } from "@keystone-ui/fields";
import { type controller } from "@keystone-6/core/fields/types/json/views";

export const Field = ({}: FieldProps<typeof controller>) => {
  return <FieldContainer></FieldContainer>;
};

export const Cell: CellComponent<typeof controller> = ({}) => {
  return <div></div>;
};
