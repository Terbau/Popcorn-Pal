import { db } from "../../db/index.js";
import type { MutationResolvers } from "../../types";

export const deleteFollow: MutationResolvers["deleteFollow"] = async (
  _,
  { userId },
  { user },
) => {
  if (!user) {
    throw new Error("Not authenticated");
  }

  if (user.id === userId) {
    throw new Error("Cannot unfollow yourself");
  }

  const existingFollow = await db
    .selectFrom("userFollow")
    .where("followerId", "=", user.id)
    .where("followingId", "=", userId)
    .executeTakeFirst();

  if (!existingFollow) {
    throw new Error("Not following user");
  }

  await db
    .deleteFrom("userFollow")
    .where("followerId", "=", user.id)
    .where("followingId", "=", userId)
    .execute();

  return true;
};
