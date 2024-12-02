import { db } from "../../db/index.js";
import type { MutationResolvers } from "../../types";
import { CommentVoteSchema } from "../../types/comment.js";

export const upsertCommentVote: MutationResolvers["upsertCommentVote"] = async (
  _,
  { commentId, input },
  { user },
) => {
  if (!user) {
    throw new Error("Not authenticated");
  }

  const { type } = CommentVoteSchema.pick({ type: true }).parse(input);

  // Do an upsert here. The `onConflict` method is used to handle conflicts and
  // update the existing row with the new values.
  const commentVote = await db
    .insertInto("commentVote")
    .values({
      commentId,
      userId: user.id,
      type,
      updatedAt: new Date(),
    })
    .onConflict((oc) =>
      oc.constraint("comment_vote_pk").doUpdateSet((eb) => ({
        type: eb.ref("excluded.type"),
        updatedAt: eb.ref("excluded.updatedAt"),
      })),
    )
    .returningAll()
    .executeTakeFirstOrThrow();

  return commentVote;
};
