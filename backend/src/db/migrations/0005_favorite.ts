import type { Kysely } from "kysely";
import type { Database } from "../types";
import { createTableWithDefaults } from "../utils";

export async function up(db: Kysely<Database>): Promise<void> {
  await createTableWithDefaults(
    "favorite",
    { id: false, createdAt: true, updatedAt: false },
    db.schema,
  )
    .addColumn("movie_id", "text", (col) =>
      col.references("movie.id").notNull().onDelete("cascade"),
    )
    .addColumn("user_id", "uuid", (col) =>
      col.references("user.id").notNull().onDelete("cascade"),
    )
    .addPrimaryKeyConstraint("favorite_pk", ["movie_id", "user_id"])
    .execute();
}

export async function down(db: Kysely<Database>): Promise<void> {
  await db.schema.dropTable("favorite").execute();
}
