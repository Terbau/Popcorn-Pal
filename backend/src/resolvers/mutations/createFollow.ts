import { db } from "../../db/index.js";
import type { MutationResolvers } from "../../types";

export const createFollow: MutationResolvers["createFollow"] = async (
  _,
  { userId },
  { user },
) => {
  if (!user) {
    throw new Error("Not authenticated");
  }

  if (user.id === userId) {
    throw new Error("Cannot follow yourself");
  }

  // Follower is yourself and following is the target
  const existingFollow = await db
    .selectFrom("userFollow")
    .where("followerId", "=", user.id)
    .where("followingId", "=", userId)
    .executeTakeFirst();

  if (existingFollow) {
    throw new Error("Already following user");
  }

  await db
    .insertInto("userFollow")
    .values({
      followerId: user.id,
      followingId: userId,
    })
    .execute();

  return true;
};
