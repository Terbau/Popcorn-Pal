import type { Generated } from "kysely";

export interface Genre {
  id: Generated<string>;
  name: string;
}

export interface Creator {
  id: string;
  name: string;
}

export interface Star {
  id: string;
  name: string;
}

export interface MovieGenre {
  movieId: string;
  genreId: string;
}

export interface MovieCreator {
  movieId: string;
  creatorId: string;
}

export interface MovieStar {
  movieId: string;
  starId: string;
}

export interface Movie {
  id: string;
  title: string;
  plot: string;
  runtime: number | null;
  yearReleased: number | null;
  releasedAt: Date | null;
  certificate: string;
  externalRating: number;
  externalMovieMeterRank: number;
  externalVotes: number;
  posterUrl: string;
  posterHeight: number;
  posterWidth: number;
  createdAt: Generated<Date>;
  updatedAt: Generated<Date>;
}
