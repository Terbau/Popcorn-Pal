import type { RemappedQuery } from "../../types.js";
import { db } from "../../db/index.js";
import type { Movie } from "../../types/movie.js";

export const getFeaturedMovies: RemappedQuery["getFeaturedMovies"] =
  async (): Promise<Movie[]> => {
    const movies = await db
      .selectFrom("movie")
      .selectAll()
      .where("showcaseOnHomePage", "=", true)
      .execute();

    // No need to return the genres, stars, and creators for the featured movies.
    return movies.map((movie) => ({
      ...movie,
      genres: [],
      stars: [],
      creators: [],
    }));
  };
