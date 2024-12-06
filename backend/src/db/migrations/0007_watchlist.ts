import { sql, type Kysely } from "kysely";
import type { Database } from "../types";
import { createTableWithDefaults } from "../utils";

export async function up(db: Kysely<Database>): Promise<void> {
  await db.schema
    .createType("watchlist_item_label")
    .asEnum(["WATCHING", "HAVE_WATCHED", "WANT_TO_WATCH"])
    .execute();

  await createTableWithDefaults(
    "watchlist_item",
    { createdAt: true },
    db.schema,
  )
    .addColumn("user_id", "uuid", (col) =>
      col.notNull().references("user.id").onDelete("cascade"),
    )
    .addColumn("movie_id", "text", (col) =>
      col.notNull().references("movie.id").onDelete("cascade"),
    )
    .addColumn("label", sql`watchlist_item_label`, (col) => col.notNull())
    .addColumn("updated_at", "timestamptz")
    .addPrimaryKeyConstraint("watchlist_item_pk", ["user_id", "movie_id"])
    .execute();
}

export async function down(db: Kysely<Database>): Promise<void> {
  await db.schema.dropTable("watchlist_item").execute();
  await db.schema.dropType("watchlist_item_label").execute();
}
