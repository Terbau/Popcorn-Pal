import { z } from "zod";
import type { QueryResolvers } from "../../types";
import { ForYouItemSchema, type ForYouItem } from "../../types/foryou.js";
import {
  fetchForYouCommentSuggestion,
  fetchForYouFollowingAddedMovieToWatchlist,
  fetchForYouFollowingCommentedOnMovie,
  fetchForYouFollowingStartedFollowingSomeoneElse,
  fetchForYouFollowingUpdatedWatchlistItem,
  fetchForYouMovieSuggestions,
  fetchForYouUserSuggestions,
} from "../../functions/foryou.js";

const GetForYouItemsSchema = z.object({
  seed: z.number(),
  page: z.number().optional().default(0),
});

export const getForYouItems: QueryResolvers["getForYouItems"] = async (
  _,
  args,
  { user },
) => {
  if (!user) {
    throw new Error("Unauthorized");
  }

  // Use schema validation to ensure that the arguments are correct
  const { seed, page } = GetForYouItemsSchema.parse(args);

  // Fetch 2 movie suggestions
  const movieSuggestionsPageSize = 3;
  const userSuggestionsPageSize = 2;
  const commentSuggestionsPageSize = 3;
  const followingStartedFollowingSomeoneElsePageSize = 1;
  const followingAddedMovieToWatchlistPageSize = 1;
  const followingUpdatedWatchlistItemPageSize = 1;
  const followingCommentedOnMoviePageSize = 1;

  // Fetch all the suggestions in parallel
  const responses = await Promise.all([
    fetchForYouMovieSuggestions(movieSuggestionsPageSize),
    fetchForYouUserSuggestions(
      user.id,
      seed,
      userSuggestionsPageSize,
      page * userSuggestionsPageSize,
    ),
    fetchForYouCommentSuggestion(
      user.id,
      seed,
      commentSuggestionsPageSize,
      page * commentSuggestionsPageSize,
    ),
    fetchForYouFollowingStartedFollowingSomeoneElse(
      user.id,
      followingStartedFollowingSomeoneElsePageSize,
      page * followingStartedFollowingSomeoneElsePageSize,
    ),
    fetchForYouFollowingAddedMovieToWatchlist(
      user.id,
      followingAddedMovieToWatchlistPageSize,
      page * followingAddedMovieToWatchlistPageSize,
    ),
    fetchForYouFollowingUpdatedWatchlistItem(
      user.id,
      followingUpdatedWatchlistItemPageSize,
      page * followingUpdatedWatchlistItemPageSize,
    ),
    fetchForYouFollowingCommentedOnMovie(
      user.id,
      followingCommentedOnMoviePageSize,
      page * followingCommentedOnMoviePageSize,
    ),
  ]);

  // Parse the responses into ForYouItem objects
  const items: ForYouItem[] = responses
    .flat()
    .map((item) => ForYouItemSchema.parse(item));

  // Shuffle the items
  items.sort(() => Math.random() - 0.5);

  return {
    results: items,
    maybeHasMore: items.length > 0,
  };
};
