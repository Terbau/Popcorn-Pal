import { z } from "zod";

export const GenreSchema = z.object({
  id: z.string(),
  name: z.string(),
});

export type Genre = z.infer<typeof GenreSchema>;

export const CreatorSchema = z.object({
  id: z.string(),
  name: z.string(),
});

export type Creator = z.infer<typeof CreatorSchema>;

export const StarSchema = z.object({
  id: z.string(),
  name: z.string(),
});

export type Star = z.infer<typeof StarSchema>;

export const MovieGenreSchema = z.object({
  movieId: z.string(),
  genreId: z.string(),
});

export type MovieGenre = z.infer<typeof MovieGenreSchema>;

export const MovieCreatorSchema = z.object({
  movieId: z.string(),
  creatorId: z.string(),
});

export type MovieCreator = z.infer<typeof MovieCreatorSchema>;

export const MovieStarSchema = z.object({
  movieId: z.string(),
  starId: z.string(),
});

export type MovieStar = z.infer<typeof MovieStarSchema>;

export const MovieSchema = z.object({
  id: z.string(),
  title: z.string(),
  plot: z.string(),
  runtime: z.number().nullable(),
  yearReleased: z.number().nullable(),
  releasedAt: z.date().nullable(),
  certificate: z.string(),
  externalRating: z.number(),
  externalMovieMeterRank: z.number(),
  externalVotes: z.number(),
  posterUrl: z.string(),
  posterHeight: z.number(),
  posterWidth: z.number(),
  landscapePosterUrl: z.string().nullable(),
  landscapePosterHeight: z.number().nullable(),
  landscapePosterWidth: z.number().nullable(),
  showcaseOnHomePage: z.boolean(),
  genres: z.array(GenreSchema),
  creators: z.array(CreatorSchema),
  stars: z.array(StarSchema),
});

export type Movie = z.infer<typeof MovieSchema>;

export const MoviesOrderByOptionsSchema = z.enum([
  "title",
  "externalRating",
  "runtime",
  "yearReleased",
])

export type MoviesOrderByOptions = z.infer<typeof MoviesOrderByOptionsSchema>;

export const MoviesOrderDirectionOptionsSchema = z.enum(["asc", "desc"])

export type MoviesOrderDirectionOptions = z.infer<typeof MoviesOrderDirectionOptionsSchema>;