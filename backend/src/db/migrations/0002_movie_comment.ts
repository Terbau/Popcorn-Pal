import type { Kysely } from "kysely";
import type { Database } from "../types";
import { createTableWithDefaults } from "../utils";

export async function up(db: Kysely<Database>): Promise<void> {
  await db.schema
    .createTable("genre")
    .addColumn("id", "text", (col) => col.primaryKey())
    .addColumn("name", "text", (col) => col.notNull().unique())
    .execute();

  await db.schema
    .createTable("creator")
    .addColumn("id", "text", (col) => col.primaryKey())
    .addColumn("name", "text", (col) => col.notNull().unique())
    .execute();

  await db.schema
    .createTable("star")
    .addColumn("id", "text", (col) => col.primaryKey())
    .addColumn("name", "text", (col) => col.notNull().unique())
    .execute();

  await createTableWithDefaults(
    "movie",
    { id: false, createdAt: true, updatedAt: true },
    db.schema,
  )
    .addColumn("id", "text", (col) => col.primaryKey())
    .addColumn("title", "text", (col) => col.notNull())
    .addColumn("plot", "text", (col) => col.notNull())
    .addColumn("runtime", "integer")
    .addColumn("year_released", "integer")
    .addColumn("released_at", "timestamptz")
    .addColumn("certificate", "text", (col) => col.notNull())
    .addColumn("external_rating", "float4", (col) => col.notNull())
    .addColumn("external_movie_meter_rank", "integer", (col) => col.notNull())
    .addColumn("external_votes", "integer", (col) => col.notNull())
    .addColumn("poster_url", "text", (col) => col.notNull())
    .addColumn("poster_height", "integer", (col) => col.notNull())
    .addColumn("poster_width", "integer", (col) => col.notNull())
    .execute();

  await db.schema
    .createTable("movie_genre")
    .addColumn("movie_id", "text", (col) =>
      col.references("movie.id").notNull().onDelete("cascade"),
    )
    .addColumn("genre_id", "text", (col) =>
      col.references("genre.id").notNull().onDelete("cascade"),
    )
    .addPrimaryKeyConstraint("movie_genre_pk", ["movie_id", "genre_id"])
    .execute();

  await db.schema
    .createTable("movie_creator")
    .addColumn("movie_id", "text", (col) =>
      col.references("movie.id").notNull().onDelete("cascade"),
    )
    .addColumn("creator_id", "text", (col) =>
      col.references("creator.id").notNull().onDelete("cascade"),
    )
    .addPrimaryKeyConstraint("movie_creator_pk", ["movie_id", "creator_id"])
    .execute();

  await db.schema
    .createTable("movie_star")
    .addColumn("movie_id", "text", (col) =>
      col.references("movie.id").notNull().onDelete("cascade"),
    )
    .addColumn("star_id", "text", (col) =>
      col.references("star.id").notNull().onDelete("cascade"),
    )
    .addPrimaryKeyConstraint("movie_star_pk", ["movie_id", "star_id"])
    .execute();

  await createTableWithDefaults(
    "comment",
    { id: true, createdAt: true, updatedAt: true },
    db.schema,
  )
    .addColumn("user_id", "uuid", (col) =>
      col.references("user.id").notNull().onDelete("cascade"),
    )
    .addColumn("movie_id", "text", (col) =>
      col.references("movie.id").notNull().onDelete("cascade"),
    )
    .addColumn("content", "text", (col) => col.notNull())
    .execute();
}

export async function down(db: Kysely<Database>): Promise<void> {
  await db.schema.dropTable("comment").execute();
  await db.schema.dropTable("movie_star").execute();
  await db.schema.dropTable("movie_creator").execute();
  await db.schema.dropTable("movie_genre").execute();
  await db.schema.dropTable("movie").execute();
  await db.schema.dropTable("star").execute();
  await db.schema.dropTable("creator").execute();
  await db.schema.dropTable("genre").execute();
}
