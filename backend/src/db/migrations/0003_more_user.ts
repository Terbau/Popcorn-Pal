import type { Kysely } from "kysely";
import type { Database } from "../types";

export async function up(db: Kysely<Database>): Promise<void> {
  await db.schema.alterTable("user").addColumn("avatar_url", "text").execute();
}

export async function down(db: Kysely<Database>): Promise<void> {
  await db.schema.alterTable("user").dropColumn("avatar_url").execute();
}
