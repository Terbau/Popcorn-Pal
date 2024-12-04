import { sql } from "kysely";
import { db } from "../db/index.js";
import type {
  Creator,
  Genre,
  MoviesOrderByOptions,
  Star,
} from "../types/movie";
import type { WatchlistItem, WatchlistItemLabel } from "../types/watchlist.js";
import { jsonBuildObject } from "kysely/helpers/postgres";

export const fetchWatchlistMoviesForUserId = async (
  userId: string,
  limit?: number,
  offset?: number,
  orderBy: MoviesOrderByOptions = "title",
  orderDirection: "asc" | "desc" = "asc",
  genres?: string[],
  labels?: WatchlistItemLabel[],
  getTotalResults = true,
): Promise<{ results: WatchlistItem[]; totalResults: number }> => {
  const movies = await db
    .with("fullMovie", (qb) =>
      qb
        .selectFrom("movie")
        .leftJoin("movieGenre", "movie.id", "movieGenre.movieId")
        .leftJoin("genre", "movieGenre.genreId", "genre.id")
        .leftJoin("movieCreator", "movie.id", "movieCreator.movieId")
        .leftJoin("creator", "movieCreator.creatorId", "creator.id")
        .leftJoin("movieStar", "movie.id", "movieStar.movieId")
        .leftJoin("star", "movieStar.starId", "star.id")
        .selectAll("movie")
        .select(({ ref }) => [
          sql<
            Genre[]
          >`COALESCE(json_agg(DISTINCT jsonb_build_object('id', genre.id, 'name', genre.name)) FILTER (WHERE ${ref(
            "genre.id",
          )} IS NOT NULL), '[]')`.as("genres"),
          sql<
            Creator[]
          >`COALESCE(json_agg(DISTINCT jsonb_build_object('id', creator.id, 'name', creator.name)) FILTER (WHERE ${ref(
            "creator.id",
          )} IS NOT NULL), '[]')`.as("creators"),
          sql<
            Star[]
          >`COALESCE(json_agg(DISTINCT jsonb_build_object('id', star.id, 'name', star.name)) FILTER (WHERE ${ref(
            "star.id",
          )} IS NOT NULL), '[]')`.as("stars"),
        ])
        .$if(genres !== undefined, (qb) =>
          qb.where("genre.id", "in", genres ?? []),
        )
        .groupBy(["movie.id", "movie.createdAt"]),
    )
    .selectFrom("fullMovie")
    .innerJoin("watchlistItem", "fullMovie.id", "watchlistItem.movieId")
    .select(({ ref }) =>
      jsonBuildObject({
        id: ref("fullMovie.id"),
        title: ref("fullMovie.title"),
        plot: ref("fullMovie.plot"),
        runtime: ref("fullMovie.runtime"),
        yearReleased: ref("fullMovie.yearReleased"),
        releasedAt: ref("fullMovie.releasedAt"),
        certificate: ref("fullMovie.certificate"),
        externalRating: ref("fullMovie.externalRating"),
        externalMovieMeterRank: ref("fullMovie.externalMovieMeterRank"),
        externalVotes: ref("fullMovie.externalVotes"),
        posterUrl: ref("fullMovie.posterUrl"),
        posterHeight: ref("fullMovie.posterHeight"),
        posterWidth: ref("fullMovie.posterWidth"),
        landscapePosterUrl: ref("fullMovie.landscapePosterUrl"),
        landscapePosterHeight: ref("fullMovie.landscapePosterHeight"),
        landscapePosterWidth: ref("fullMovie.landscapePosterWidth"),
        showcaseOnHomePage: ref("fullMovie.showcaseOnHomePage"),
        genres: ref("fullMovie.genres"),
        creators: ref("fullMovie.creators"),
        stars: ref("fullMovie.stars"),
        label: ref("watchlistItem.label"),
        updatedAt: ref("watchlistItem.updatedAt"),
      }).as("movie"),
    )
    .selectAll("watchlistItem")
    .where("watchlistItem.userId", "=", userId)
    .$if(labels !== undefined, (qb) =>
      qb.where("watchlistItem.label", "in", labels ?? []),
    )
    .$if(limit !== undefined, (qb) => qb.limit(limit ?? 0))
    .$if(offset !== undefined, (qb) => qb.offset(offset ?? 0))
    .$if(orderBy !== undefined, (qb) => qb.orderBy(orderBy, orderDirection))
    .execute();

  let totalResults = 1;

  if (getTotalResults) {
    const totalResultsRow = await db
      .selectFrom((eb) =>
        eb
          .selectFrom("movie")
          .select("id")
          .innerJoin("watchlistItem", "movie.id", "watchlistItem.movieId")
          .leftJoin("movieGenre", "movie.id", "movieGenre.movieId")
          .$if(labels !== undefined, (qb) =>
            qb.where("watchlistItem.label", "in", labels ?? []),
          )
          .$if(genres !== undefined, (qb) =>
            qb.where("movieGenre.genreId", "in", genres ?? []),
          )
          .where("watchlistItem.userId", "=", userId)
          .as("subquery"),
      )
      .select(sql<number>`COUNT(DISTINCT subquery.id)`.as("total"))
      .executeTakeFirstOrThrow();

    totalResults = totalResultsRow.total;
  }

  return {
    results: movies,
    totalResults,
  };
};
