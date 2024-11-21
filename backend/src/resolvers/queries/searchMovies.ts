import type { RemappedQuery } from "../../types";
import type { SearchResult } from "../../__generated__/types";
import { searchImdb } from "../../imdb/index.js";
import {
  fetchSearchResults,
  fetchTotalSearchResults,
  upsertMoviesByMovieIds,
} from "../../functions.js";
import { z } from "zod";

const MINIMUM_MOVIES_BEFORE_EXTERNAL_SEARCH = 5;
const MINIMUM_MOVIES_SIMILARITY_THRESHOLD_FOR_EXTERNAL_FETCH = 0.25;

// Adjust if we want to not show any movies that are not similar to the search query
// 0-1, 0 being not similar at all, 1 being exactly the same
const MINIMUM_SIMILARITY = 0.05;

const SearchMoviesSchema = z.object({
  query: z.string(),
  page: z.number().int().min(0).optional().default(0),
  pageSize: z.number().int().min(0).optional().default(30),
});

export const searchMovies: RemappedQuery["searchMovies"] = async (
  _,
  { query, page, pageSize },
): Promise<SearchResult> => {
  const {
    query: validatedQuery,
    page: validatedPage,
    pageSize: validatedPageSize,
  } = SearchMoviesSchema.parse({ query, page, pageSize });

  const limit = validatedPageSize;
  const offset = validatedPage * validatedPageSize;

  let searchResults = await fetchSearchResults(
    validatedQuery,
    limit,
    offset,
    MINIMUM_SIMILARITY,
  );

  if (validatedPage === 0) {
    const moviesAmountAboveThreshold = searchResults.filter(
      (movie) =>
        (movie.similarity ?? 0) >
        MINIMUM_MOVIES_SIMILARITY_THRESHOLD_FOR_EXTERNAL_FETCH,
    ).length;
    if (moviesAmountAboveThreshold < MINIMUM_MOVIES_BEFORE_EXTERNAL_SEARCH) {
      const externalMovieSearchResults = await searchImdb(validatedQuery);
      // upsert movies to the database
      await upsertMoviesByMovieIds(
        externalMovieSearchResults
          .filter(
            (movie) =>
              movie.image?.imageUrl !== undefined && movie.type === "movie",
          )
          .map((movie) => movie.id),
      );

      // refetch the search results as we now might have different results form our database
      searchResults = await fetchSearchResults(
        validatedQuery,
        limit,
        offset,
        MINIMUM_SIMILARITY,
      );
    }
  }

  const totalResults = await fetchTotalSearchResults(
    validatedQuery,
    MINIMUM_SIMILARITY,
  );

  return {
    movies: searchResults,
    totalResults,
    nextPage: offset + limit < totalResults ? validatedPage + 1 : null,
  };
};
