import type { RemappedQuery } from "../../types";
import { movies as mockMovies } from "../../mock.js";

export const randomMovie: RemappedQuery["randomMovie"] = () => {
  const randomIndex = Math.floor(Math.random() * mockMovies.length);
  return mockMovies[randomIndex];
};
