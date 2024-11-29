import { db } from "../../db/index.js";
import type { QueryResolvers } from "../../types.js";
import { sql } from "kysely";

export const randomMovie: QueryResolvers["randomMovie"] = async () => {
  const movie = await db
    .selectFrom("movie")
    .selectAll("movie")
    .orderBy(sql`RANDOM()`)
    .limit(1)
    .executeTakeFirstOrThrow();

  return {
    ...movie,
    genres: [],
    stars: [],
    creators: [],
  };
};
