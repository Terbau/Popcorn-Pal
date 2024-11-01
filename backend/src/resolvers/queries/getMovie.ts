import type { RemappedQuery } from "../../types";
import { fetchMovies } from "../../functions.js";

export const getMovie: RemappedQuery["getMovie"] = async (_, { id }) => {
  const movies = await fetchMovies([id]);

  if (movies.length === 0) {
    return null;
  }

  return movies.at(0);
};
