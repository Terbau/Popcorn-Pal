import { db } from "../../db/index.js";
import { fetchMovies } from "../../functions.js";
import type { QueryResolvers } from "../../types";

export const getWatchlistItem: QueryResolvers["getWatchlistItem"] = async (
  _,
  { userId, movieId },
) => {
  const watchlistItem = await db
    .selectFrom("watchlistItem")
    .selectAll()
    .where("userId", "=", userId)
    .where("movieId", "=", movieId)
    .executeTakeFirst();

  if (!watchlistItem) {
    return null;
  }

  const movies = await fetchMovies([watchlistItem.movieId]);

  return {
    ...watchlistItem,
    movie: movies.results[0],
  };
};
