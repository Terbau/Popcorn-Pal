import { sql, type Kysely } from "kysely";
import type { Database } from "../types";
import { createTableWithDefaults } from "../utils";

export async function up(db: Kysely<Database>): Promise<void> {
  await db.schema
    .createType("comment_vote_type")
    .asEnum(["UPVOTE", "DOWNVOTE"])
    .execute();

  await db.schema
    .alterTable("comment")
    .addColumn("parent_id", "uuid")
    .addColumn("deleted_at", "timestamptz")
    .alterColumn("updated_at", (col) => col.dropDefault())
    .alterColumn("updated_at", (col) => col.dropNotNull())
    .execute();

  // Need to set updatedAt to null for all rows. Ideally would have liked to do this
  // only for rows that have not actually been updated, but that would be pretty much
  // impossible to know.
  await db
    .updateTable("comment")
    .set({ updatedAt: null })
    .execute();

  await createTableWithDefaults(
    "comment_vote",
    { createdAt: true, updatedAt: true },
    db.schema,
  )
    .addColumn("comment_id", "uuid", (col) =>
      col.references("comment.id").notNull().onDelete("cascade"),
    )
    .addColumn("user_id", "uuid", (col) =>
      col.references("user.id").notNull().onDelete("cascade"),
    )
    .addColumn("type", sql`comment_vote_type`, (col) => col.notNull())
    .addPrimaryKeyConstraint("comment_vote_pk", ["comment_id", "user_id"])
    .execute();
}

export async function down(db: Kysely<Database>): Promise<void> {
  await db.schema.dropTable("comment_vote").execute();
  await db
    .updateTable("comment")
    .set({ updatedAt: new Date() })
    .where("updatedAt", "is", null)
    .execute();
  await db.schema
    .alterTable("comment")
    .dropColumn("parent_id")
    .dropColumn("deleted_at")
    .alterColumn("updated_at", (col) => col.setDefault("now()"))
    .alterColumn("updated_at", (col) => col.setNotNull())
    .execute();
  await db.schema.dropType("comment_vote_type").execute();
}
