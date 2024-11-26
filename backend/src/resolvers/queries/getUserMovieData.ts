import { UserMovieData } from "../../__generated__/types";
import { db } from "../../db/index.js";
import { RemappedQuery } from "../../types";

export const getUserMovieData: RemappedQuery["getUserMovieData"] = async (
  _,
  { movieId },
  { user }
): Promise<UserMovieData> => {
  if (!user) {
    throw new Error("Not authenticated");
  }
  if (!movieId) {
    throw new Error("Invalid input");
  }
  const userFavoriteData = await db
    .selectFrom("favorite")
    .select("favorite.createdAt")
    .where("movieId", "=", movieId)
    .where("userId", "=", user.id)
    .executeTakeFirst();

  return {
    favorite: !!userFavoriteData,
    favoritedAt: userFavoriteData?.createdAt ?? null,
    movieId: movieId,
    userId: user.id,
  };
};
