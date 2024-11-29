import { sql } from "kysely";
import { db } from "./db/index.js";
import { getItemsByIds } from "./imdb/index.js";
import type { Creator, Genre, Movie, Star } from "./types/movie.js";
import type { SearchMovie } from "./generated/types.js";

export const moviesOrderOptions = [
  "title",
  "externalRating",
  "runtime",
  "yearReleased",
] as const;
type MoviesOrderOptions = (typeof moviesOrderOptions)[number];

export const fetchSearchResults = async (
  query: string,
  limit: number,
  offset: number,
  minSimilarity = 0.25,
): Promise<SearchMovie[]> => {
  return await db
    .selectFrom((eb) =>
      eb
        .selectFrom("movie")
        .selectAll()
        .select(sql<number>`SIMILARITY(title, ${query})`.as("similarity"))
        .as("subquery"),
    )
    .selectAll("subquery")
    .orderBy("similarity", "desc")
    .where("similarity", ">=", minSimilarity)
    .limit(limit)
    .offset(offset)
    .execute();
};

export const fetchTotalSearchResults = async (
  query: string,
  minSimilarity = 0.25,
): Promise<number> => {
  const totalResults = await db
    .selectFrom((eb) =>
      eb
        .selectFrom("movie")
        .select(sql<number>`SIMILARITY(title, ${query})`.as("similarity"))
        .as("subquery"),
    )
    .select(sql<number>`COUNT(*)`.as("total"))
    .where("similarity", ">=", minSimilarity)
    .executeTakeFirst();

  return totalResults?.total ?? 0;
};

export const fetchMovies = async (
  ids?: string[],
  limit?: number,
  offset?: number,
  orderBy: MoviesOrderOptions = "title",
  orderDirection: "asc" | "desc" = "asc",
  genres?: string[],
  getTotalResults = false,
): Promise<{ results: Movie[]; totalResults: number }> => {
  const movies = await db
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
    .$if(genres !== undefined, (qb) => qb.where("genre.id", "in", genres ?? []))
    .$if(ids !== undefined, (qb) => qb.where("movie.id", "in", ids ?? []))
    .$if(limit !== undefined, (qb) => qb.limit(limit ?? 0))
    .$if(offset !== undefined, (qb) => qb.offset(offset ?? 0))
    .$if(orderBy !== undefined, (qb) => qb.orderBy(orderBy, orderDirection))
    .groupBy(["movie.id", "movie.createdAt"])
    .execute();

  let totalResults = 0;

  if (getTotalResults) {
    const totalResultsQueryResult = await db
      .selectFrom((eb) =>
        eb
          .selectFrom("movie")
          .select("id")
          .leftJoin("movieGenre", "movie.id", "movieGenre.movieId")
          .$if(genres !== undefined, (qb) =>
            qb.where("movieGenre.genreId", "in", genres ?? []),
          )
          .$if(ids !== undefined, (qb) => qb.where("movie.id", "in", ids ?? []))
          .as("subquery"),
      )
      .select(sql<number>`COUNT(DISTINCT subquery.id)`.as("total"))
      .executeTakeFirst();

    totalResults = totalResultsQueryResult?.total ?? movies.length;
  }

  return {
    results: movies,
    totalResults,
  };
};

export const upsertMoviesByMovieIds = async (
  movieIds: string[],
): Promise<void> => {
  if (movieIds.length === 0) {
    return;
  }

  const movies = await getItemsByIds(movieIds);

  const mappedMovies = [];
  const mappedGenres: Map<string, Genre> = new Map();
  const mappedCreators: Map<string, Creator> = new Map();
  const mappedStars: Map<string, Star> = new Map();
  const mappedMovieGenres = [];
  const mappedMovieCreators = [];
  const mappedMovieStars = [];

  for (const movie of Object.values(movies)) {
    mappedMovies.push({
      id: movie.id,
      title: movie.title,
      plot: movie.plot,
      runtime: movie.runtime,
      yearReleased: movie.yearReleased,
      releasedAt: movie.releasedAt,
      certificate: movie.certificate,
      externalRating: movie.stats.starRating,
      externalMovieMeterRank: movie.stats.movieMeterRank,
      externalVotes: movie.stats.votes,
      posterUrl: movie.poster?.url ?? "",
      posterHeight: movie.poster?.height ?? 0,
      posterWidth: movie.poster?.width ?? 0,
      showcaseOnHomePage: false,
      updatedAt: new Date(),
    });

    for (const genre of movie.genres) {
      if (!mappedGenres.has(genre)) {
        mappedGenres.set(genre, { id: genre, name: genre });
      }

      mappedMovieGenres.push({
        movieId: movie.id,
        genreId: genre,
      });
    }

    for (const creator of movie.creators) {
      if (!mappedCreators.has(creator.id)) {
        mappedCreators.set(creator.id, { id: creator.id, name: creator.name });
      }

      mappedMovieCreators.push({
        movieId: movie.id,
        creatorId: creator.id,
      });
    }

    for (const star of movie.stars) {
      if (!mappedStars.has(star.id)) {
        mappedStars.set(star.id, { id: star.id, name: star.name });
      }

      mappedMovieStars.push({
        movieId: movie.id,
        starId: star.id,
      });
    }
  }

  // update all movies at once
  await db
    .insertInto("movie")
    .values(mappedMovies)
    .onConflict((oc) =>
      oc.column("id").doUpdateSet((eb) => ({
        title: eb.ref("excluded.title"),
        plot: eb.ref("excluded.plot"),
        runtime: eb.ref("excluded.runtime"),
        yearReleased: eb.ref("excluded.yearReleased"),
        releasedAt: eb.ref("excluded.releasedAt"),
        certificate: eb.ref("excluded.certificate"),
        externalRating: eb.ref("excluded.externalRating"),
        externalMovieMeterRank: eb.ref("excluded.externalMovieMeterRank"),
        externalVotes: eb.ref("excluded.externalVotes"),
        posterUrl: eb.ref("excluded.posterUrl"),
        posterHeight: eb.ref("excluded.posterHeight"),
        posterWidth: eb.ref("excluded.posterWidth"),
        updatedAt: eb.ref("excluded.updatedAt"),
      })),
    )
    .execute();

  await db
    .insertInto("genre")
    .values(Array.from(mappedGenres.values()))
    .onConflict((oc) =>
      oc.column("id").doUpdateSet((eb) => ({
        name: eb.ref("excluded.name"),
      })),
    )
    .execute();

  await db
    .insertInto("creator")
    .values(Array.from(mappedCreators.values()))
    .onConflict((oc) =>
      oc.column("id").doUpdateSet((eb) => ({
        name: eb.ref("excluded.name"),
      })),
    )
    .execute();

  await db
    .insertInto("star")
    .values(Array.from(mappedStars.values()))
    .onConflict((oc) =>
      oc.column("id").doUpdateSet((eb) => ({
        name: eb.ref("excluded.name"),
      })),
    )
    .execute();

  await db
    .insertInto("movieGenre")
    .values(mappedMovieGenres)
    .onConflict((oc) => oc.constraint("movie_genre_pk").doNothing())
    .execute();

  await db
    .insertInto("movieCreator")
    .values(mappedMovieCreators)
    .onConflict((oc) => oc.constraint("movie_creator_pk").doNothing())
    .execute();

  await db
    .insertInto("movieStar")
    .values(mappedMovieStars)
    .onConflict((oc) => oc.constraint("movie_star_pk").doNothing())
    .execute();
};
