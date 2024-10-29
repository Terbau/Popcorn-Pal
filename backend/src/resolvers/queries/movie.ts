import { movies } from "../../mock.js";
import type { RemappedQuery } from "../../types";

export const movie: RemappedQuery["movie"] = (_, { id }) =>
  movies.find((movie) => movie.id === id);
