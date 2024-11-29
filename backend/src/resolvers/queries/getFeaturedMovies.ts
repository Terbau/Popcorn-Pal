import { db } from "../../db/index.js";
import type { QueryResolvers } from "../../types.js";

export const getFeaturedMovies: QueryResolvers["getFeaturedMovies"] =
  async () => {
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
