import { db } from "../../db/index.js";
import type { MutationResolvers } from "../../types";

export const deleteCommentVote: MutationResolvers["deleteCommentVote"] = async (
  _,
  { commentId },
  { user },
) => {
  if (!user) {
    throw new Error("Not authenticated");
  }

  const ret = await db
    .deleteFrom("commentVote")
    .where("commentId", "=", commentId)
    .where("userId", "=", user.id)
    .executeTakeFirst();

  return Number(ret.numDeletedRows) === 1;
};
