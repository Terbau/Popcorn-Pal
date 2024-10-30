import type { Generated } from "kysely";

export interface Session {
  id: Generated<string>;
  userId: string;
  createdAt: Generated<Date>;
  expiresAt: Date;
}
