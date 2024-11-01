import { z } from "zod";
import { fetchMovies, moviesOrderOptions } from "../../functions.js";
import type { RemappedQuery } from "../../types.js";

const GetMoviesSchema = z.object({
  page: z.number().int().min(0).optional().default(0),
  pageSize: z.number().int().min(0).optional().default(30),
  orderBy: z.enum(moviesOrderOptions).optional().default("title"),
  orderDirection: z.enum(["asc", "desc"]).optional().default("asc"),
});

export const getMovies: RemappedQuery["getMovies"] = async (
  _,
  { page, pageSize, orderBy, orderDirection },
) => {
  const {
    page: validatedPage,
    pageSize: validatedPageSize,
    orderBy: validatedOrderBy,
    orderDirection: validatedOrderDirection,
  } = GetMoviesSchema.parse({ page, pageSize, orderBy, orderDirection });

  const limit = validatedPageSize;
  const offset = validatedPage * validatedPageSize;

  const movies = await fetchMovies(
    undefined,
    limit,
    offset,
    validatedOrderBy,
    validatedOrderDirection,
  );

  return movies;
};
