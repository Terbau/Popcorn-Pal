import { Generated } from "kysely";

export interface Favorite {
  userId: string;
  movieId: string;
  createdAt: Generated<Date>;
}
