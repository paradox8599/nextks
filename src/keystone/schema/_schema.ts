import { type Lists } from ".keystone/types";
import { user } from "./user";

export const lists = {
  User: user,
} satisfies Lists;
