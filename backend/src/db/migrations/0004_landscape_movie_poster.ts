import type { Kysely } from "kysely";
import type { Database } from "../types";

export async function up(db: Kysely<Database>): Promise<void> {
  await db.schema
    .alterTable("movie")
    .addColumn("landscape_poster_url", "text")
    .addColumn("landscape_poster_width", "text")
    .addColumn("landscape_poster_height", "text")
    .addColumn("showcase_on_home_page", "boolean", (col) =>
      col.notNull().defaultTo(false),
    )
    .execute();
}

export async function down(db: Kysely<Database>): Promise<void> {
  await db.schema
    .alterTable("movie")
    .dropColumn("showcase_on_home_page")
    .dropColumn("landscape_poster_height")
    .dropColumn("landscape_poster_width")
    .dropColumn("landscape_poster_url")
    .execute();
}
