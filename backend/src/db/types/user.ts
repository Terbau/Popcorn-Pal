import type { Generated } from "kysely";

export interface User {
  id: Generated<string>;
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  createdAt: Generated<Date>;
  updatedAt: Generated<Date>;
  avatarUrl: string | null;
}

export interface UserFollow {
  followerId: string;
  followingId: string;
  createdAt: Generated<Date>;
}
