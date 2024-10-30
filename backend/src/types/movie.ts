import { z } from "zod";

export const CommentSchema = z.object({
  user: z.string(),
  content: z.string(),
  date: z.string(),
  id: z.number(),
})

export type Comment = z.infer<typeof CommentSchema>;

export const MovieSchema = z.object({
  id: z.number(),
  title: z.string(),
  description: z.string(),
  releaseDate: z.string(),
  genres: z.array(z.string()),
  rating: z.number(),
  director: z.string(),
  cast: z.array(z.string()),
  runtime: z.string(),
  posterUrl: z.string(),
  comments: z.array(CommentSchema),
})

export type Movie = z.infer<typeof MovieSchema>;
