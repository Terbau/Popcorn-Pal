import { db } from "../../db/index.js";
import { fetchMovies } from "../../functions.js";
import type { MutationResolvers } from "../../types";
import { WatchlistItemSchema } from "../../types/watchlist.js";

const CreateWatchlistItemSchema = WatchlistItemSchema.pick({
  movieId: true,
  label: true,
});

export const createWatchlistItem: MutationResolvers["createWatchlistItem"] =
  async (_, { input }, { user }) => {
    if (!user) {
      throw new Error("Unauthorized");
    }

    const { movieId, label } = CreateWatchlistItemSchema.parse(input);

    const watchlistItem = await db
      .insertInto("watchlistItem")
      .values({
        movieId,
        label,
        userId: user.id,
      })
      .returningAll()
      .executeTakeFirstOrThrow();

    const movies = await fetchMovies([watchlistItem.movieId]);

    return {
      ...watchlistItem,
      movie: movies.results[0],
    };
  };
