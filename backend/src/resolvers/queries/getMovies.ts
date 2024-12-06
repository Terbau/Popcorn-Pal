import { z } from "zod";
import type { QueryResolvers } from "../../types.js";
import {
  MoviesOrderByOptionsSchema,
  MoviesOrderDirectionOptionsSchema,
} from "../../types/movie.js";
import { fetchMovies } from "../../functions/movies.js";

const GetMoviesSchema = z.object({
  page: z.number().int().min(0).optional().default(0),
  pageSize: z.number().int().min(0).optional().default(30),
  orderBy: MoviesOrderByOptionsSchema.optional().default("title"),
  orderDirection: MoviesOrderDirectionOptionsSchema.optional().default("asc"),
  genres: z.array(z.string()).optional(),
});

export const getMovies: QueryResolvers["getMovies"] = async (_, args) => {
  // Use schema validation to ensure that the arguments are correct
  const { page, pageSize, orderBy, orderDirection, genres } =
    GetMoviesSchema.parse(args);

  // Convert the page and pageSize to limit and offset
  const limit = pageSize;
  const offset = page * pageSize;

  const { results, totalResults } = await fetchMovies(
    undefined,
    limit,
    offset,
    orderBy,
    orderDirection,
    genres,
    true,
  );

  return {
    results,
    totalResults,
  };
};
