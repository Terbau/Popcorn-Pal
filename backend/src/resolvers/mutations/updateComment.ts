import { z } from "zod";
import type { MutationResolvers } from "../../types";
import { db } from "../../db/index.js";

const UpdateCommentSchema = z.object({
  content: z.string().min(5).max(500),
});

export const updateComment: MutationResolvers["updateComment"] = async (
  _,
  { id, input },
  { user },
) => {
  if (!user) {
    throw new Error("Unauthorized");
  }

  const { content } = UpdateCommentSchema.parse(input);

  const comment = await db
    .selectFrom("comment")
    .selectAll()
    .where("id", "=", id)
    .executeTakeFirst();

  if (!comment) {
    throw new Error("Comment not found");
  }

  if (comment.userId !== user.id) {
    throw new Error("You can only update your own comments");
  }

  if (comment.deletedAt !== null) {
    throw new Error("Comment is deleted");
  }

  const updatedComment = await db
    .updateTable("comment")
    .set({ content, updatedAt: new Date() })
    .where("id", "=", id)
    .returningAll()
    .executeTakeFirstOrThrow();

  return updatedComment;
};
