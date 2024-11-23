import { db } from "../../db/index.js";
import { throwNotAuthenticatedError } from "../../errors.js";
import type { RemappedQuery } from "../../types";
import { UserSchema, type User } from "../../types/user.js";

export const getUser: RemappedQuery["getUser"] = async (
  _,
  { id },
  { user },
): Promise<User | null> => {
  if (!id) {
    if (!user) {
      return throwNotAuthenticatedError();
    }

    return user;
  }

  if (!UserSchema.pick({ id }).parse({ id })) {
    throw new Error("Invalid input");
  }

  const foundUser = await db
    .selectFrom("user")
    .select([
      "id",
      "email",
      "firstName",
      "lastName",
      "avatarUrl",
      "createdAt",
      "updatedAt",
    ])
    .where("id", "=", id)
    .executeTakeFirst();
  if (!foundUser) {
    return null;
  }

  return foundUser;
};
