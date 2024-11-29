import { db } from "../../db/index.js";
import type { QueryResolvers } from "../../types.js";

export const getGenres: QueryResolvers["getGenres"] = async () => {
  const genres = await db.selectFrom("genre").selectAll().execute();

  return genres;
};
