import { RemappedQuery } from "../../types";
import { movies as mockMovies } from "../../mock.js";

export const searchMovies: RemappedQuery["searchMovies"] = async () => {
  // sleep for two seconds
  await new Promise((resolve) => setTimeout(resolve, 2000));

  return {
    movies: mockMovies,
    externalMovies: [],
    totalResults: mockMovies.length,
  };
};
