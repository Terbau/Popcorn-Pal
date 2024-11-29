import { db } from "../../db/index.js";
import type { QueryResolvers } from "../../types.js";
import { throwNotAuthenticatedError } from "../../errors.js";
import { UserSchema } from "../../types/user.js";

export const getUser: QueryResolvers["getUser"] = async (
  _,
  { id },
  { user },
) => {
  if (!id) {
    if (!user) {
      return throwNotAuthenticatedError();
    }

    return user;
  }

  if (!UserSchema.pick({ id: true }).parse({ id })) {
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
