import { db } from "../../db/index.js";
import type { MutationResolvers } from "../../types";

export const deleteWatchlistItem: MutationResolvers["deleteWatchlistItem"] =
  async (_, { movieId }, { user }) => {
    if (!user) {
      throw new Error("Unauthorized");
    }

    const row = await db
      .deleteFrom("watchlistItem")
      .where("movieId", "=", movieId)
      .where("userId", "=", user.id)
      .executeTakeFirstOrThrow();

    return Number(row.numDeletedRows) === 1;
  };
