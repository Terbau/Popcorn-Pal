import { z } from "zod";
import type { QueryResolvers } from "../../types";
import {
  MoviesOrderByOptionsSchema,
  MoviesOrderDirectionOptionsSchema,
} from "../../types/movie.js";
import { fetchWatchlistMoviesForUserId } from "../../functions/watchlist.js";
import { WatchlistItemLabelSchema } from "../../types/watchlist.js";

const GetWatchlistItems = z.object({
  userId: z.string().uuid(),
  page: z.number().int().min(0).optional().default(0),
  pageSize: z.number().int().min(0).optional().default(30),
  orderBy: MoviesOrderByOptionsSchema.optional().default("title"),
  orderDirection: MoviesOrderDirectionOptionsSchema.optional().default("asc"),
  genres: z.array(z.string()).optional(),
  labels: z.array(WatchlistItemLabelSchema).optional(),
});

export const getWatchlistItems: QueryResolvers["getWatchlistItems"] = async (
  _,
  args,
) => {
  const { userId, page, pageSize, orderBy, orderDirection, genres, labels } =
    GetWatchlistItems.parse(args);

  const limit = pageSize;
  const offset = page * pageSize;

  const { results, totalResults } = await fetchWatchlistMoviesForUserId(
    userId,
    limit,
    offset,
    orderBy,
    orderDirection,
    genres,
    labels,
    true,
  );

  return {
    results,
    totalResults,
    userId,
    genres,
    labels,
    orderBy,
    orderDirection,
  };
};
