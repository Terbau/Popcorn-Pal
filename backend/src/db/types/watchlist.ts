import type { Generated } from "kysely";

export interface WatchlistItem {
  userId: string;
  movieId: string;
  label: "WATCHING" | "HAVE_WATCHED" | "WANT_TO_WATCH";
  createdAt: Generated<Date>;
  updatedAt: Date | null;
}
