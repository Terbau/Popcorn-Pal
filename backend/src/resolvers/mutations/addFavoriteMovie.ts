import { db } from "../../db/index.js";
import { RemappedMutation } from "../../types";

export const addFavoriteMovie: RemappedMutation["addFavoriteMovie"] = async (
  _,
  { movieId },
  { user }
): Promise<boolean> => {
  if (!user) {
    throw new Error("Not authenticated");
  }
  if (!movieId) {
    throw new Error("Invalid input");
  }
  await db
    .insertInto("favorite")
    .values({ userId: user.id, movieId })
    .execute();

  return true;
};
