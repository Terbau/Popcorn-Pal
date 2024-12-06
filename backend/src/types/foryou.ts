import { z } from "zod";

export const ForYouItemTypeEnum = z.enum([
  "MOVIE_SUGGESTION",
  "USER_SUGGESTION",
  "COMMENT_SUGGESTION",
  "FOLLOWING_STARTED_FOLLOWING_SOMEONE_ELSE",
  "FOLLOWING_ADDED_MOVIE_TO_WATCHLIST",
  "FOLLOWING_UPDATED_WATCHLIST_ITEM",
  "FOLLOWING_COMMENTED_ON_MOVIE",
]);

export type ForYouItemType = z.infer<typeof ForYouItemTypeEnum>;

export const ForYouItemSchema = z.object({
  type: ForYouItemTypeEnum,
  userId: z.string().optional(),
  userFirstName: z.string().optional(),
  userLastName: z.string().optional(),
  userAvatarUrl: z.string().nullable().optional(),
  movieId: z.string().optional(),
  movieTitle: z.string().optional(),
  moviePosterUrl: z.string().optional(),
  commentId: z.string().optional(),
  commentContent: z.string().optional(),
  commentIsReply: z.boolean().optional(),
  targetUserId: z.string().optional(),
  targetUserFirstName: z.string().optional(),
  targetUserLastName: z.string().optional(),
  targetUserAvatarUrl: z.string().nullable().optional(),
  watchlistItemLabel: z.string().optional(),
  timestamp: z.date().optional(),
})

export type ForYouItem = z.infer<typeof ForYouItemSchema>;

export const ForYouMovieSuggestionSchema = z.object({
  type: z.literal("MOVIE_SUGGESTION"),
  movieId: z.string(),
  movieTitle: z.string(),
  moviePosterUrl: z.string(),
});

export type ForYouMovieSuggestion = z.infer<typeof ForYouMovieSuggestionSchema>;

export const ForYouUserSuggestionSchema = z.object({
  type: z.literal("USER_SUGGESTION"),
  userId: z.string(),
  userFirstName: z.string(),
  userLastName: z.string(),
  userAvatarUrl: z.string().nullable(),
});

export type ForYouUserSuggestion = z.infer<typeof ForYouUserSuggestionSchema>;

export const ForYouCommentSuggestionSchema = z.object({
  type: z.literal("COMMENT_SUGGESTION"),
  userId: z.string(),
  userFirstName: z.string(),
  userLastName: z.string(),
  userAvatarUrl: z.string().nullable(),
  commentId: z.string(),
  commentContent: z.string(),
  commentIsReply: z.boolean(),
  movieId: z.string(),
  movieTitle: z.string(),
  moviePosterUrl: z.string(),
  timestamp: z.date(),
});

export type ForYouCommentSuggestion = z.infer<
  typeof ForYouCommentSuggestionSchema
>;

export const ForYouFollowingStartedFollowingSomeoneElseSchema = z.object({
  type: z.literal("FOLLOWING_STARTED_FOLLOWING_SOMEONE_ELSE"),
  userId: z.string(),
  userFirstName: z.string(),
  userLastName: z.string(),
  userAvatarUrl: z.string().nullable(),
  targetUserId: z.string(),
  targetUserFirstName: z.string(),
  targetUserLastName: z.string(),
  targetUserAvatarUrl: z.string().nullable(),
  timestamp: z.date(),
});

export type ForYouFollowingStartedFollowingSomeoneElse = z.infer<
  typeof ForYouFollowingStartedFollowingSomeoneElseSchema
>;

export const ForYouFollowingAddedMovieToWatchlistSchema = z.object({
  type: z.literal("FOLLOWING_ADDED_MOVIE_TO_WATCHLIST"),
  userId: z.string(),
  userFirstName: z.string(),
  userLastName: z.string(),
  userAvatarUrl: z.string().nullable(),
  movieId: z.string(),
  movieTitle: z.string(),
  moviePosterUrl: z.string(),
  watchlistItemLabel: z.string(),
  timestamp: z.date(),
});

export type ForYouFollowingAddedMovieToWatchlist = z.infer<
  typeof ForYouFollowingAddedMovieToWatchlistSchema
>;

export const ForYouFollowingUpdatedWatchlistItemSchema = z.object({
  type: z.literal("FOLLOWING_UPDATED_WATCHLIST_ITEM"),
  userId: z.string(),
  userFirstName: z.string(),
  userLastName: z.string(),
  userAvatarUrl: z.string().nullable(),
  movieId: z.string(),
  movieTitle: z.string(),
  moviePosterUrl: z.string(),
  watchlistItemLabel: z.string(),
  timestamp: z.date(),
});

export type ForYouFollowingUpdatedWatchlistItem = z.infer<
  typeof ForYouFollowingUpdatedWatchlistItemSchema
>;

export const ForYouFollowingCommentedOnMovieSchema = z.object({
  type: z.literal("FOLLOWING_COMMENTED_ON_MOVIE"),
  userId: z.string(),
  userFirstName: z.string(),
  userLastName: z.string(),
  userAvatarUrl: z.string().nullable(),
  commentId: z.string(),
  commentContent: z.string(),
  commentIsReply: z.boolean(),
  movieId: z.string(),
  movieTitle: z.string(),
  moviePosterUrl: z.string(),
  timestamp: z.date(),
});

export type ForYouFollowingCommentedOnMovie = z.infer<
  typeof ForYouFollowingCommentedOnMovieSchema
>;
