import type { RemappedQuery } from "../../types";
import { db } from "../../db/index.js";
import type { SearchResult } from "../../__generated__/types";
import { searchImdb } from "../../imdb/index.js";
import { upsertMoviesByMovieIds } from "../../functions.js";
import type { ImdbSearchResultEntry } from "../../imdb/types";

const AMOUNT_SEARCH_RESULTS = 10;

export const searchMovies: RemappedQuery["searchMovies"] = async (
  _,
  { query },
): Promise<SearchResult> => {
  let externalMovieSearchResults: ImdbSearchResultEntry[] = [];

  const searchResults = await db
    .selectFrom("movie")
    .selectAll()
    .where("title", "ilike", `%${query}%`)
    .limit(AMOUNT_SEARCH_RESULTS)
    .execute();

  if (searchResults.length < AMOUNT_SEARCH_RESULTS) {
    externalMovieSearchResults = await searchImdb(query);
    externalMovieSearchResults = externalMovieSearchResults.filter(
      (movie) => movie.image?.imageUrl !== undefined && movie.type === "movie",
    );

    // upsert movies in the background
    upsertMoviesByMovieIds(externalMovieSearchResults.map((movie) => movie.id));
  }

  const externalMovies = externalMovieSearchResults
    .filter(
      (movie) =>
        !searchResults.some((searchMovie) => searchMovie.id === movie.id),
    )
    .slice(0, AMOUNT_SEARCH_RESULTS - searchResults.length)
    .map((movie) => ({
      id: movie.id,
      title: movie.title,
      yearReleased: movie.yearReleased,
      posterUrl: movie.image?.imageUrl,
      posterHeight: movie.image?.height,
      posterWidth: movie.image?.width,
      externalRating: movie.rank,
    }));

  return {
    movies: searchResults,
    externalMovies: externalMovies,
    totalResults: searchResults.length + externalMovies.length,
  };
};
