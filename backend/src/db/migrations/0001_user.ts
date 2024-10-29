import type { Kysely } from "kysely";
import type { Database } from "../types";
import { createTableWithDefaults } from "../utils";

export async function up(db: Kysely<Database>): Promise<void> {
  await createTableWithDefaults(
    "user",
    { id: true, createdAt: true, updatedAt: true },
    db.schema,
  )
    .addColumn("email", "text", (col) => col.notNull())
    .addColumn("first_name", "text", (col) => col.notNull())
    .addColumn("last_name", "text", (col) => col.notNull())
    .addColumn("password", "text", (col) => col.notNull())
    .execute();

  await createTableWithDefaults(
    "session",
    {
      id: false,
      createdAt: true,
      updatedAt: false,
    },
    db.schema,
  )
    .addColumn("id", "text", (col) => col.primaryKey())
    .addColumn("user_id", "uuid", (col) =>
      col.references("user.id").notNull().onDelete("cascade"),
    )
    .addColumn("expires_at", "timestamptz", (col) => col.notNull())
    .execute();
}

export async function down(db: Kysely<Database>): Promise<void> {
  await db.schema.dropTable("session").execute();
  await db.schema.dropTable("user").execute();
}
