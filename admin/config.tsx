import type { AdminConfig } from "@keystone-6/core/types";
import { Navigation } from "./navigation";

export const components: AdminConfig["components"] = {
  Logo: () => <h1>Admin</h1>,
  Navigation,
};
