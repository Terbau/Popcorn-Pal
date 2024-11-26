import { db } from "../../db/index.js";
import { RemappedMutation } from "../../types";

export const deleteFavoriteMovie: RemappedMutation["deleteFavoriteMovie"] =
  async (_, { movieId }, { user }): Promise<boolean> => {
    if (!user) {
      throw new Error("Not authenticated");
    }
    if (!movieId) {
      throw new Error("Invalid input");
    }
    const result = await db
      .deleteFrom("favorite")
      .where("userId", "=", user.id)
      .where("movieId", "=", movieId)
      .executeTakeFirst();

    return result.numDeletedRows > 0;
  };
