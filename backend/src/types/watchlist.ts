import { z } from "zod";
import { MovieSchema } from "./movie.js";

export const WatchlistItemLabelSchema = z.enum([
  "WATCHING",
  "HAVE_WATCHED",
  "WANT_TO_WATCH",
]);

export type WatchlistItemLabel = z.infer<typeof WatchlistItemLabelSchema>;

export const WatchlistItemSchema = z.object({
  userId: z.string().uuid(),
  movieId: z.string(),
  label: WatchlistItemLabelSchema,
  createdAt: z.date(),
  updatedAt: z.date().nullable(),
  movie: MovieSchema,
});

export type WatchlistItem = z.infer<typeof WatchlistItemSchema>;
