import { sql } from "kysely";
import { db } from "../db/index.js";
import type {
  ForYouCommentSuggestion,
  ForYouFollowingAddedMovieToWatchlist,
  ForYouFollowingCommentedOnMovie,
  ForYouFollowingStartedFollowingSomeoneElse,
  ForYouFollowingUpdatedWatchlistItem,
  ForYouMovieSuggestion,
  ForYouUserSuggestion,
} from "../types/foryou.js";

/**
 * Fetches the For You movie suggestions
 * @param limit - The maximum number of movie suggestions to fetch
 * @returns The movie suggestions
 */
export const fetchForYouMovieSuggestions = async (
  limit: number,
): Promise<ForYouMovieSuggestion[]> => {
  // Get random movies from the database

  const moviesData = await db
    .selectFrom("movie")
    .select([
      "id as movieId",
      "title as movieTitle",
      "posterUrl as moviePosterUrl",
    ])
    .orderBy(sql`RANDOM()`)
    .limit(limit)
    .execute();

  return moviesData.map((movie) => ({
    ...movie,
    type: "MOVIE_SUGGESTION",
  }));
};

/**
 * Fetches the For You user suggestions
 * @param userId - The user ID
 * @param seed - The seed for the random number generator
 * @param limit - The maximum number of user suggestions to fetch
 * @param offset - The offset to start fetching user suggestions from
 * @returns The user suggestions
 */
export const fetchForYouUserSuggestions = async (
  userId: string,
  seed: number,
  limit: number,
  offset: number,
): Promise<ForYouUserSuggestion[]> => {
  await sql`SELECT setseed(${seed})`.execute(db);

  const usersData = await db
    .selectFrom("user")
    .select([
      "id as userId",
      "firstName as userFirstName",
      "lastName as userLastName",
      "avatarUrl as userAvatarUrl",
    ])
    .where("id", "!=", userId)
    .where((eb) =>
      eb.not(
        eb.exists(
          eb
            .selectFrom("userFollow")
            .select("followingId")
            .where("followerId", "=", userId)
            .whereRef("followingId", "=", "user.id"),
        ),
      ),
    )
    .orderBy(sql`RANDOM()`)
    .limit(limit)
    .offset(offset)
    .execute();

  return usersData.map((user) => ({
    ...user,
    type: "USER_SUGGESTION",
  }));
};

/**
 * Fetches the For You comment suggestions
 * @param userId - The user ID
 * @param seed - The seed for the random number generator
 * @param limit - The maximum number of comment suggestions to fetch
 * @param offset - The offset to start fetching comment suggestions from
 * @returns The comment suggestions
 */
export const fetchForYouCommentSuggestion = async (
  userId: string,
  seed: number,
  limit: number,
  offset: number,
): Promise<ForYouCommentSuggestion[]> => {
  await sql`SELECT setseed(${seed})`.execute(db);

  const commentsData = await db
    .selectFrom("comment")
    .innerJoin("movie", "comment.movieId", "movie.id")
    .innerJoin("user", "comment.userId", "user.id")
    .select([
      "comment.id as commentId",
      "comment.content as commentContent",
      sql<boolean>`CASE WHEN parent_id IS NULL THEN FALSE ELSE TRUE END`.as(
        "commentIsReply",
      ),
      "comment.createdAt as timestamp",
      "movie.id as movieId",
      "movie.title as movieTitle",
      "movie.posterUrl as moviePosterUrl",
      "user.id as userId",
      "user.firstName as userFirstName",
      "user.lastName as userLastName",
      "user.avatarUrl as userAvatarUrl",
    ])
    .where("comment.userId", "!=", userId)
    .orderBy(sql`RANDOM()`)
    .limit(limit)
    .offset(offset)
    .execute();

  return commentsData.map((comment) => ({
    ...comment,
    type: "COMMENT_SUGGESTION",
  }));
};

/**
 * Fetches the For You following started following someone else items
 * @param userId - The user ID
 * @param limit - The maximum number of items to fetch
 * @param offset - The offset to start fetching items from
 * @returns The following started following someone else items
 */
export const fetchForYouFollowingStartedFollowingSomeoneElse = async (
  userId: string,
  limit: number,
  offset: number,
): Promise<ForYouFollowingStartedFollowingSomeoneElse[]> => {
  // Follower is someone you are following and following is the target
  const data = await db
    .selectFrom("userFollow")
    .innerJoin(
      "user as userYouAreFollowing",
      "userFollow.followerId",
      "userYouAreFollowing.id",
    )
    .innerJoin(
      "user as userThatWasFollowed",
      "userFollow.followingId",
      "userThatWasFollowed.id",
    )
    .select([
      "userYouAreFollowing.id as userId",
      "userYouAreFollowing.firstName as userFirstName",
      "userYouAreFollowing.lastName as userLastName",
      "userYouAreFollowing.avatarUrl as userAvatarUrl",
      "userThatWasFollowed.id as targetUserId",
      "userThatWasFollowed.firstName as targetUserFirstName",
      "userThatWasFollowed.lastName as targetUserLastName",
      "userThatWasFollowed.avatarUrl as targetUserAvatarUrl",
      "userFollow.createdAt as timestamp",
    ])
    .where("userFollow.followerId", "!=", userId)
    .where(
      "userFollow.followingId",
      "in",
      db
        .selectFrom("userFollow")
        .select("followingId")
        .where("followerId", "=", userId),
    )
    .orderBy("userFollow.createdAt", "desc")
    .limit(limit)
    .offset(offset)
    .execute();

  return data.map((item) => ({
    ...item,
    type: "FOLLOWING_STARTED_FOLLOWING_SOMEONE_ELSE",
  }));
};

/**
 * Fetches the For You following added movie to watchlist items
 * @param userId - The user ID
 * @param limit - The maximum number of items to fetch
 * @param offset - The offset to start fetching items from
 * @returns The following added movie to watchlist items
 */
export const fetchForYouFollowingAddedMovieToWatchlist = async (
  userId: string,
  limit: number,
  offset: number,
): Promise<ForYouFollowingAddedMovieToWatchlist[]> => {
  const data = await db
    .selectFrom("watchlistItem")
    .innerJoin("movie", "watchlistItem.movieId", "movie.id")
    .innerJoin("user", "watchlistItem.userId", "user.id")
    .select([
      "watchlistItem.userId as userId",
      "user.firstName as userFirstName",
      "user.lastName as userLastName",
      "user.avatarUrl as userAvatarUrl",
      "movie.id as movieId",
      "movie.title as movieTitle",
      "movie.posterUrl as moviePosterUrl",
      "watchlistItem.label as watchlistItemLabel",
      "watchlistItem.createdAt as timestamp",
    ])
    .where(
      "watchlistItem.userId",
      "in",
      db
        .selectFrom("userFollow")
        .select("followingId")
        .where("followerId", "=", userId),
    )
    .orderBy("watchlistItem.createdAt", "desc")
    .limit(limit)
    .offset(offset)
    .execute();

  return data.map((item) => ({
    ...item,
    type: "FOLLOWING_ADDED_MOVIE_TO_WATCHLIST",
  }));
};

/**
 * Fetches the For You following updated watchlist item items
 * @param userId - The user ID
 * @param limit - The maximum number of items to fetch
 * @param offset - The offset to start fetching items from
 * @returns The following updated watchlist item items
 */
export const fetchForYouFollowingUpdatedWatchlistItem = async (
  userId: string,
  limit: number,
  offset: number,
): Promise<ForYouFollowingUpdatedWatchlistItem[]> => {
  const data = await db
    .selectFrom("watchlistItem")
    .innerJoin("movie", "watchlistItem.movieId", "movie.id")
    .innerJoin("user", "watchlistItem.userId", "user.id")
    .select([
      "watchlistItem.userId as userId",
      "user.firstName as userFirstName",
      "user.lastName as userLastName",
      "user.avatarUrl as userAvatarUrl",
      "movie.id as movieId",
      "movie.title as movieTitle",
      "movie.posterUrl as moviePosterUrl",
      "watchlistItem.label as watchlistItemLabel",
      sql<Date>`watchlist_item.updated_at`.as("timestamp"), // force not being nullable as we have a where clause below
    ])
    .where("watchlistItem.updatedAt", "is not", null)
    .where(
      "watchlistItem.userId",
      "in",
      db
        .selectFrom("userFollow")
        .select("followingId")
        .where("followerId", "=", userId),
    )
    .orderBy("watchlistItem.updatedAt", "desc")
    .limit(limit)
    .offset(offset)
    .execute();

  return data.map((item) => ({
    ...item,
    type: "FOLLOWING_UPDATED_WATCHLIST_ITEM",
  }));
};

/**
 * Fetches the For You following commented on movie items
 * @param userId - The user ID
 * @param limit - The maximum number of items to fetch
 * @param offset - The offset to start fetching items from
 * @returns The following commented on movie items
 */
export const fetchForYouFollowingCommentedOnMovie = async (
  userId: string,
  limit: number,
  offset: number,
): Promise<ForYouFollowingCommentedOnMovie[]> => {
  const data = await db
    .selectFrom("comment")
    .innerJoin("movie", "comment.movieId", "movie.id")
    .innerJoin("user", "comment.userId", "user.id")
    .select([
      "comment.userId as userId",
      "user.firstName as userFirstName",
      "user.lastName as userLastName",
      "user.avatarUrl as userAvatarUrl",
      "comment.id as commentId",
      "comment.content as commentContent",
      sql<boolean>`CASE WHEN parent_id IS NULL THEN FALSE ELSE TRUE END`.as(
        "commentIsReply",
      ),
      "movie.id as movieId",
      "movie.title as movieTitle",
      "movie.posterUrl as moviePosterUrl",
      "comment.createdAt as timestamp",
    ])
    .where(
      "comment.userId",
      "in",
      db
        .selectFrom("userFollow")
        .select("followingId")
        .where("followerId", "=", userId),
    )
    .orderBy("comment.createdAt", "desc")
    .limit(limit)
    .offset(offset)
    .execute();

  return data.map((item) => ({
    ...item,
    type: "FOLLOWING_COMMENTED_ON_MOVIE",
  }));
};
