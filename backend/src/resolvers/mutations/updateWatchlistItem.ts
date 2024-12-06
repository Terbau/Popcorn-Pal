import { db } from "../../db/index.js";
import { fetchMovies } from "../../functions/movies.js";
import type { MutationResolvers } from "../../types";
import { WatchlistItemSchema } from "../../types/watchlist.js";

const UpdateWatchlistItemSchema = WatchlistItemSchema.pick({
  label: true,
});

export const updateWatchlistItem: MutationResolvers["updateWatchlistItem"] =
  async (_, { movieId, input }, { user }) => {
    if (!user) {
      throw new Error("Unauthorized");
    }

    // Use schema validation to ensure that the arguments are correct
    const { label } = UpdateWatchlistItemSchema.parse(input);

    const watchlistItem = await db
      .updateTable("watchlistItem")
      .set({
        label,
      })
      .where("movieId", "=", movieId)
      .where("userId", "=", user.id)
      .returningAll()
      .executeTakeFirstOrThrow();

    const movies = await fetchMovies([watchlistItem.movieId]);

    return {
      ...watchlistItem,
      movie: movies.results[0],
    };
  };
