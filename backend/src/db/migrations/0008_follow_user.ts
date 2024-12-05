import type { Kysely } from "kysely";
import type { Database } from "../types";
import { createTableWithDefaults } from "../utils";

export async function up(db: Kysely<Database>): Promise<void> {
  await createTableWithDefaults("user_follow", { createdAt: true }, db.schema)
    .addColumn("follower_id", "uuid", (col) =>
      col.notNull().references("user.id").onDelete("cascade"),
    )
    .addColumn("following_id", "uuid", (col) =>
      col.notNull().references("user.id").onDelete("cascade"),
    )
    .addPrimaryKeyConstraint("user_follow_pk", ["follower_id", "following_id"])
    .execute();
}

export async function down(db: Kysely<Database>): Promise<void> {
  await db.schema.dropTable("user_follow").execute();
}
