import { sql } from "kysely";
import { db } from "../db/index.js";
import type {
  PaginatedComments,
  RecursiveComment,
  PaginatedRecursiveComments,
} from "../types/comment.js";
import { jsonBuildObject } from "kysely/helpers/postgres";
import type { User } from "../types/user.js";

/**
 * Fetches the root comments for the given movie ID
 * @param movieId - The movie ID
 * @param limit - The maximum number of comments to fetch
 * @param offset - The offset to start fetching comments from
 * @returns The root comments
 */
export const fetchRootComments = async (
  movieId: string,
  limit = 30,
  offset = 0,
): Promise<PaginatedComments> => {
  const [comments, totalResultsRow] = await Promise.all([
    db
      .selectFrom("comment")
      .select([
        "comment.id",
        "comment.movieId",
        sql<string | null>`CASE 
          WHEN comment.deleted_at IS NOT NULL THEN NULL 
          ELSE comment.user_id 
        END`.as("userId"),
        sql<string>`CASE 
          WHEN comment.deleted_at IS NOT NULL THEN '' 
          ELSE comment.content 
        END`.as("content"),
        "comment.parentId",
        "comment.createdAt",
        "comment.updatedAt",
        "comment.deletedAt",
      ])
      .where("movieId", "=", movieId)
      .where("parentId", "is", null)
      .limit(limit)
      .offset(offset)
      .execute(),
    db
      .selectFrom("comment")
      .select(({ fn }) => fn.count<number>("comment.id").as("totalResults"))
      .where("movieId", "=", movieId)
      .where("parentId", "is", null)
      .executeTakeFirst(),
  ]);

  const totalResults = totalResultsRow?.totalResults ?? 0;

  return {
    results: comments,
    totalResults: totalResults,
  };
};

/**
 * Fetches the replies for the given parent ID
 * @param parentId - The parent ID
 * @param limit - The maximum number of replies to fetch
 * @param offset - The offset to start fetching replies from
 * @returns The replies
 */
export const fetchReplies = async (
  parentId: string,
  limit = 30,
  offset = 0,
): Promise<PaginatedComments> => {
  const [comments, totalResultsRow] = await Promise.all([
    db
      .selectFrom("comment")
      .select([
        "comment.id",
        "comment.movieId",
        sql<string | null>`CASE 
          WHEN comment.deleted_at IS NOT NULL THEN NULL 
          ELSE comment.user_id 
        END`.as("userId"),
        sql<string>`CASE 
          WHEN comment.deleted_at IS NOT NULL THEN '' 
          ELSE comment.content 
        END`.as("content"),
        "comment.parentId",
        "comment.createdAt",
        "comment.updatedAt",
        "comment.deletedAt",
      ])
      .where("parentId", "=", parentId)
      .limit(limit)
      .offset(offset)
      .execute(),
    db
      .selectFrom("comment")
      .select(({ fn }) => fn.count<number>("comment.id").as("totalResults"))
      .where("parentId", "=", parentId)
      .executeTakeFirst(),
  ]);

  const totalResults = totalResultsRow?.totalResults ?? 0;

  return {
    results: comments,
    totalResults: totalResults,
  };
};

/**
 * Fetches a comment by its ID
 * @param id - The comment ID
 * @param currentUserId - The current user ID
 * @returns The comment
 */
export const fetchComment = async (
  id: string,
  currentUserId?: string,
): Promise<RecursiveComment | null> => {
  const comment = await db
    .selectFrom("comment")
    .innerJoin("user", "user.id", "comment.userId")
    .leftJoin("comment as subcomment", (join) =>
      join
        .onRef("subcomment.parentId", "=", "comment.id")
        .on("subcomment.parentId", "=", id),
    )
    .leftJoin("commentVote", "commentVote.commentId", "comment.id")
    .select([
      "comment.id",
      "comment.movieId",
      sql<string | null>`CASE 
        WHEN comment.deleted_at IS NOT NULL THEN NULL 
        ELSE comment.user_id 
      END`.as("userId"),
      sql<string>`CASE 
        WHEN comment.deleted_at IS NOT NULL THEN '' 
        ELSE comment.content 
      END`.as("content"),
      "comment.parentId",
      "comment.createdAt",
      "comment.updatedAt",
      "comment.deletedAt",
    ])
    .select(({ fn }) =>
      fn
        .coalesce(
          fn.sum<number>(
            sql<number>`CASE 
            WHEN comment_vote.type = 'UPVOTE' THEN 1 
            WHEN comment_vote.type = 'DOWNVOTE' THEN -1 
            ELSE 0 
          END`,
          ),
          sql<number>`0`,
        )
        .as("voteRatio"),
    )
    .select(
      // if currentUserId is null, this will always return false
      sql<boolean>`CASE WHEN comment_vote.type = 'UPVOTE' AND comment_vote.user_id = ${currentUserId} THEN true ELSE false END`.as(
        "hasUpvoted",
      ),
    )
    .select(
      // if currentUserId is null, this will always return false
      sql<boolean>`CASE WHEN comment_vote.type = 'DOWNVOTE' AND comment_vote.user_id = ${currentUserId} THEN true ELSE false END`.as(
        "hasDownvoted",
      ),
    )
    .select(sql<number>`0`.as("depth"))
    .select(({ fn }) =>
      fn
        .coalesce(fn.count<number>("subcomment.id"), sql`0`)
        .as("totalComments"),
    )
    .select(({ ref }) =>
      sql<User | null>`CASE 
        WHEN comment.deleted_at IS NOT NULL THEN NULL
        ELSE ${jsonBuildObject({
    id: ref("user.id"),
    firstName: ref("user.firstName"),
    lastName: ref("user.lastName"),
    email: ref("user.email"),
    avatarUrl: ref("user.avatarUrl"),
    createdAt: ref("user.createdAt"),
    updatedAt: ref("user.updatedAt"),
  })}
      END`.as("user"),
    )
    .where("comment.id", "=", id)
    .groupBy([
      "comment.id",
      "comment.movieId",
      "comment.userId",
      "comment.content",
      "comment.parentId",
      "comment.createdAt",
      "comment.updatedAt",
      "comment.deletedAt",
      "user.id",
      "user.firstName",
      "user.lastName",
      "user.email",
      "user.avatarUrl",
      "user.createdAt",
      "user.updatedAt",
      "commentVote.type",
      "commentVote.userId",
    ])
    .executeTakeFirst();

  return comment ?? null;
};

/**
 * Fetches comments recursively
 * @param movieId - The movie ID
 * @param parentId - The parent ID
 * @param maxDepth - The maximum depth to fetch comments
 * @param limit - The maximum number of comments to fetch
 * @param offset - The offset to start fetching comments from
 * @param limitAtDepth - The maximum number of comments to fetch at each depth
 * @param orderDirection - The order direction
 * @param currentUserId - The current user ID
 * @returns The comments in a flatmap
 */
export const fetchCommentsRecursively = async (
  movieId: string,
  parentId: string | null,
  maxDepth = 2,
  limit = 30,
  offset = 0,
  limitAtDepth = 3,
  orderDirection: "asc" | "desc" = "desc",
  currentUserId?: string,
): Promise<PaginatedRecursiveComments> => {
  if (orderDirection !== "asc" && orderDirection !== "desc") {
    throw new Error("Invalid order direction");
  }

  // This is a query from hell. It recursively fetches comments and returns them in a
  // flat list. If you need a tree structure, you need to create a function to create a tree from
  // the flat list of comments.
  const [results, totalResultsRow] = await Promise.all([
    db
      .withRecursive("comment_tree", (cte) =>
        cte
          .selectFrom((subQuery) =>
            subQuery
              .selectFrom("comment as root")
              .select([
                "root.id",
                "root.movieId",
                "root.userId",
                "root.content",
                "root.parentId",
                "root.createdAt",
                "root.updatedAt",
                "root.deletedAt",
              ])
              .select(sql<number>`0`.as("depth"))
              .select(({ selectFrom }) =>
                selectFrom("comment as sub")
                  .select(({ fn }) =>
                    fn
                      .coalesce(fn.count<number>("sub.id"), sql<number>`0`)
                      .as("totalComments"),
                  )
                  .whereRef("sub.parentId", "=", "root.id")
                  .as("totalComments"),
              )
              .where("root.parentId", parentId ? "=" : "is", parentId)
              .where("root.movieId", "=", movieId)
              .orderBy("root.createdAt", orderDirection)
              .limit(limit)
              .offset(offset)
              .as("paginated_root"),
          )
          .selectAll("paginated_root")
          .unionAll((qb) =>
            qb
              .selectFrom((subQuery) =>
                subQuery
                  .selectFrom((subSubQuery) =>
                    subSubQuery
                      .selectFrom("comment as child")
                      .select([
                        "child.id",
                        "child.movieId",
                        "child.userId",
                        "child.content",
                        "child.parentId",
                        "child.createdAt",
                        "child.updatedAt",
                        "child.deletedAt",
                      ])
                      .select(
                        // orderDirection is checked above, so it's safe to use it here
                        sql<number>`ROW_NUMBER() OVER (PARTITION BY child.parent_id ORDER BY child.created_at ${sql.raw(
                          orderDirection,
                        )})`.as("rowNumber"),
                      )
                      .as("numbered_children"),
                  )
                  .selectAll("numbered_children")
                  .where("numbered_children.rowNumber", "<=", limitAtDepth)
                  .as("limited_children"),
              )
              .select([
                "limited_children.id",
                "limited_children.movieId",
                "limited_children.userId",
                "limited_children.content",
                "limited_children.parentId",
                "limited_children.createdAt",
                "limited_children.updatedAt",
                "limited_children.deletedAt",
              ])
              .select(sql<number>`comment_tree.depth + 1`.as("depth"))
              .select(({ selectFrom }) =>
                selectFrom("comment as sub")
                  .select(({ fn }) =>
                    fn
                      .coalesce(fn.count<number>("sub.id"), sql<number>`0`)
                      .as("totalComments"),
                  )
                  .whereRef("sub.parentId", "=", "limited_children.id")
                  .as("totalComments"),
              )
              .innerJoin(
                "comment_tree",
                "comment_tree.id",
                "limited_children.parentId",
              )
              .where("comment_tree.depth", "<", maxDepth),
          ),
      )
      .selectFrom("comment_tree")
      .innerJoin("user", "user.id", "comment_tree.userId")
      .leftJoin("commentVote", "comment_tree.id", "commentVote.commentId")
      .select([
        "comment_tree.id",
        "comment_tree.movieId",
        sql<string | null>`CASE 
          WHEN comment_tree.deleted_at IS NOT NULL THEN NULL 
          ELSE comment_tree.user_id 
        END`.as("userId"),
        sql<string>`CASE 
          WHEN comment_tree.deleted_at IS NOT NULL THEN '' 
          ELSE comment_tree.content 
        END`.as("content"),
        "comment_tree.parentId",
        "comment_tree.createdAt",
        "comment_tree.updatedAt",
        "comment_tree.depth",
        "comment_tree.deletedAt",
      ])
      .select(({ fn }) =>
        fn
          .coalesce("comment_tree.totalComments", sql<number>`0`)
          .as("totalComments"),
      )
      .select(({ ref }) =>
        sql<User | null>`CASE 
          WHEN comment_tree.deleted_at IS NOT NULL THEN NULL
          ELSE ${jsonBuildObject({
    id: ref("user.id"),
    firstName: ref("user.firstName"),
    lastName: ref("user.lastName"),
    email: ref("user.email"),
    avatarUrl: ref("user.avatarUrl"),
    createdAt: ref("user.createdAt"),
    updatedAt: ref("user.updatedAt"),
  })}
        END`.as("user"),
      )
      .select(({ fn }) =>
        fn
          .coalesce(
            fn.sum<number>(
              sql<number>`CASE 
                WHEN comment_vote.type = 'UPVOTE' THEN 1 
                WHEN comment_vote.type = 'DOWNVOTE' THEN -1 
                ELSE 0 
              END`,
            ),
            sql<number>`0`,
          )
          .as("voteRatio"),
      )
      .select(
        // if currentUserId is null, this will always return false
        sql<boolean>`CASE WHEN comment_vote.type = 'UPVOTE' AND comment_vote.user_id = ${currentUserId} THEN true ELSE false END`.as(
          "hasUpvoted",
        ),
      )
      .select(
        // if currentUserId is null, this will always return false
        sql<boolean>`CASE WHEN comment_vote.type = 'DOWNVOTE' AND comment_vote.user_id = ${currentUserId} THEN true ELSE false END`.as(
          "hasDownvoted",
        ),
      )
      .groupBy([
        "comment_tree.id",
        "comment_tree.movieId",
        "comment_tree.userId",
        "comment_tree.content",
        "comment_tree.parentId",
        "comment_tree.createdAt",
        "comment_tree.updatedAt",
        "comment_tree.depth",
        "comment_tree.totalComments",
        "comment_tree.depth",
        "comment_tree.deletedAt",
        "user.id",
        "user.firstName",
        "user.lastName",
        "user.email",
        "user.avatarUrl",
        "user.createdAt",
        "user.updatedAt",
        "commentVote.type",
        "commentVote.userId",
      ])
      .orderBy("depth", "asc")
      .orderBy("createdAt", orderDirection)
      .execute(),
    db
      .selectFrom("comment")
      .select(({ fn }) =>
        fn.coalesce(fn.count<number>("comment.id"), sql`0`).as("totalResults"),
      )
      .where("movieId", "=", movieId)
      .where("parentId", parentId ? "=" : "is", parentId)
      .executeTakeFirst(),
  ]);

  return {
    results,
    totalResults: totalResultsRow?.totalResults ?? 0,
  };
};
