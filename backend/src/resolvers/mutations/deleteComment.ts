import { sql } from "kysely";
import { db } from "../../db/index.js";
import type { MutationResolvers } from "../../types";

export const deleteComment: MutationResolvers["deleteComment"] = async (
  _,
  { id },
  { user },
) => {
  if (!user) {
    throw new Error("Unauthorized");
  }

  const comment = await db
    .selectFrom("comment")
    .selectAll()
    .where("id", "=", id)
    .executeTakeFirst();
  if (!comment) {
    throw new Error("Comment not found");
  }

  if (comment.deletedAt !== null) {
    throw new Error("Comment already deleted");
  }

  if (comment.userId !== user.id) {
    throw new Error("You can only delete your own comments");
  }

  const deletedComment = await db
    .updateTable("comment")
    .set({
      deletedAt: new Date(),
    })
    .where("id", "=", id)
    .returning([
      "comment.id",
      "comment.movieId",
      "comment.parentId",
      "comment.createdAt",
      "comment.updatedAt",
      "comment.deletedAt",
      sql<null>`NULL`.as("userId"),
      sql<string>`''`.as("content"),
    ])
    .executeTakeFirstOrThrow();

  return deletedComment;
};
