import type { Session } from "./auth";
import type { User } from "./user";

export interface Database {
  user: User;
  session: Session;
}
