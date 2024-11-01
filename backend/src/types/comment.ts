import { z } from "zod";

export const CommentSchema = z.object({
  id: z.string().uuid(),
  userId: z.string().uuid(),
  movieId: z.string(),
  content: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export type Comment = z.infer<typeof CommentSchema>;
