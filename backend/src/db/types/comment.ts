import type { Generated } from "kysely";

export interface Comment {
  id: Generated<string>;
  movieId: string;
  userId: string;
  content: string;
  createdAt: Generated<Date>;
  updatedAt: Generated<Date>;
}
