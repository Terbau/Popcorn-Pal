import { db } from "../../db/index.js";
import type { RemappedQuery } from "../../types";
import type { User } from "../../types/user.js";

export const getUser: RemappedQuery["getUser"] = async (
  _,
  { id },
  { user },
): Promise<User> => {
  if (!id) {
    if (!user) {
      throw new Error("Not authenticated");
    }

    return user;
  }

  const foundUser = await db
    .selectFrom("user")
    .select(["id", "email", "firstName", "lastName", "createdAt", "updatedAt"])
    .executeTakeFirst();
  if (!foundUser) {
    throw new Error("User not found");
  }

  return foundUser;
};
