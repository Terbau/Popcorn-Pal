import { fetchComment } from "../../functions/comments.js";
import type { QueryResolvers } from "../../types";

export const getComment: QueryResolvers["getComment"] = async (
  _,
  { id },
  { user },
) => {
  // Just return null if no id is provided.
  if (!id) {
    return null;
  }

  const comment = await fetchComment(id, user?.id);
  return comment;
};
