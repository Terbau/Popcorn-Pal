import type { RemappedQuery } from "../../types";
import { db } from "../../db/index.js";
import { sql } from "kysely";

export const randomMovie: RemappedQuery["randomMovie"] = async () => {
  const movie = await db
    .selectFrom("movie")
    .selectAll("movie")
    .orderBy(sql`RANDOM()`)
    .limit(1)
    .executeTakeFirstOrThrow();

  return movie;
};
