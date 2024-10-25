import { list } from "@keystone-6/core";
import { password, text } from "@keystone-6/core/fields";
import { Lists } from ".keystone/types";
import { allowLoggedIn } from "./_access";

export const user: Lists.User = list({
  access: allowLoggedIn,

  fields: {
    name: text({ validation: { isRequired: true } }),
    email: text({ validation: { isRequired: true }, isIndexed: "unique" }),
    password: password({ validation: { isRequired: true } }),
  },
});
