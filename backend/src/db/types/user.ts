import type { Generated } from "kysely";

export interface User {
  id: Generated<string>;
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  createdAt: Generated<Date>;
  updatedAt: Generated<Date>;
}
