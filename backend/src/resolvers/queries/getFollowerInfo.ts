import { sql } from "kysely";
import { db } from "../../db/index.js";
import type { QueryResolvers } from "../../types";

export const getFollowerInfo: QueryResolvers["getFollowerInfo"] = async (
  _,
  { userId },
  { user },
) => {
  let isFollowing = false;

  if (user) {
    const existingFollow = await db
      .selectFrom("userFollow")
      .select("followerId")
      .where("followerId", "=", user.id)
      .where("followingId", "=", userId)
      .executeTakeFirst();

    if (existingFollow) {
      isFollowing = true;
    }
  }

  const followingData = await db
    .selectFrom("userFollow")
    .select(({ fn }) =>
      fn.coalesce(fn.count("followingId"), sql`0`).as("followingCount"),
    )
    .where("followerId", "=", userId)
    .executeTakeFirst();
  const followersData = await db
    .selectFrom("userFollow")
    .select(({ fn }) =>
      fn.coalesce(fn.count("followerId"), sql`0`).as("followerCount"),
    )
    .where("followingId", "=", userId)
    .executeTakeFirst();

  return {
    currentUserIsFollowing: isFollowing,
    followingCount: Number(followingData?.followingCount ?? 0),
    followerCount: Number(followersData?.followerCount ?? 0),
    userId,
  };
};
