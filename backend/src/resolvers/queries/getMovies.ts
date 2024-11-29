import { z } from "zod";
import { fetchMovies, moviesOrderOptions } from "../../functions.js";
import type { QueryResolvers } from "../../types.js";

const GetMoviesSchema = z.object({
  page: z.number().int().min(0).optional().default(0),
  pageSize: z.number().int().min(0).optional().default(30),
  orderBy: z.enum(moviesOrderOptions).optional().default("title"),
  orderDirection: z.enum(["asc", "desc"]).optional().default("asc"),
  genres: z.array(z.string()).optional(),
});

export const getMovies: QueryResolvers["getMovies"] = async (
  _,
  { page, pageSize, orderBy, orderDirection, genres, filterGenres },
) => {
  const {
    page: validatedPage,
    pageSize: validatedPageSize,
    orderBy: validatedOrderBy,
    orderDirection: validatedOrderDirection,
    genres: validatedGenres,
  } = GetMoviesSchema.parse({
    page,
    pageSize,
    orderBy,
    orderDirection,
    genres,
  });

  const limit = validatedPageSize;
  const offset = validatedPage * validatedPageSize;

  const { results, totalResults } = await fetchMovies(
    undefined,
    limit,
    offset,
    validatedOrderBy,
    validatedOrderDirection,
    validatedGenres,
    true,
  );

  return {
    results,
    totalResults,
  };
};
