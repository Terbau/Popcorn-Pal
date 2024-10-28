import type { Generated } from "kysely";

export interface User {
  id: Generated<string>;
  email: string;
  name: string;
  createdAt: Generated<Date>;
  updatedAt: Generated<Date>;
}
