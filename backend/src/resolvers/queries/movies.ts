import type { RemappedQuery } from "../../types";
import { movies as mockMovies } from "../../mock.js";

export const movies: RemappedQuery["movies"] = () => mockMovies;
