import { z } from "zod";
import type { MutationResolvers } from "../../types";
import { db } from "../../db/index.js";

const MIN_CONTENT_LENGTH = 1;
const MAX_CONTENT_LENGTH = 500;

const CreateCommentSchema = z.object({
  movieId: z.string(),
  content: z.string().min(MIN_CONTENT_LENGTH).max(MAX_CONTENT_LENGTH),
  parentId: z.string().optional(),
});

export const createComment: MutationResolvers["createComment"] = async (
  _,
  { input },
  { user },
) => {
  if (!user) {
    throw new Error("Unauthorized");
  }

  const { movieId, content, parentId } = CreateCommentSchema.parse(input);

  const comment = await db
    .insertInto("comment")
    .values({
      movieId,
      content,
      userId: user.id,
      parentId,
    })
    .returningAll()
    .executeTakeFirstOrThrow();

  return comment;
};
