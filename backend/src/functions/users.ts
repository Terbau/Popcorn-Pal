import { sql } from "kysely";
import { db } from "../db/index.js";
import type { PaginatedUsersResponse } from "../types/user.js";

export const fetchUsersSearchResults = async (
  searchQuery: string,
  offset: number,
  limit: number,
): Promise<PaginatedUsersResponse> => {
  const [results, totalResults] = await Promise.all([
    db
      .selectFrom((qb) =>
        qb
          .selectFrom("user")
          .selectAll()
          .select(
            sql<string>`(${sql.ref("firstName")} || ' ' || ${sql.ref(
              "lastName",
            )})`.as("fullName"),
          )
          .select(
            sql<number>`
            CASE
              WHEN (${sql.ref("firstName")} || ' ' || ${sql.ref(
  "lastName",
)}) ILIKE ${`${searchQuery}%`} THEN 5
              WHEN ${sql.ref(
    "firstName",
  )} ILIKE ${`${searchQuery}%`} AND ${sql.ref(
  "lastName",
)} ILIKE ${`${searchQuery}%`} THEN 4
              WHEN ${sql.ref("firstName")} ILIKE ${`${searchQuery}%`} THEN 3
              WHEN ${sql.ref("lastName")} ILIKE ${`${searchQuery}%`} THEN 2
              WHEN ${sql.ref("firstName")} ILIKE ${`%${searchQuery}%`} THEN 1.5
              WHEN ${sql.ref("lastName")} ILIKE ${`%${searchQuery}%`} THEN 1
              ELSE 0
            END
          `.as("score"),
          )
          .orderBy("score", "desc")
          .as("subquery"),
      )
      .where((eb) =>
        eb.or([
          eb("firstName", "ilike", `%${searchQuery}%`),
          eb("lastName", "ilike", `%${searchQuery}%`),
          eb("fullName", "ilike", `%${searchQuery}%`),
        ]),
      )
      .select([
        "subquery.id",
        "subquery.firstName",
        "subquery.lastName",
        "subquery.email",
        "subquery.createdAt",
        "subquery.updatedAt",
        "subquery.avatarUrl",
      ])
      .orderBy("firstName", "asc")
      .orderBy("lastName", "asc")
      .offset(offset)
      .limit(limit)
      .execute(),
    db
      .selectFrom((qb) =>
        qb
          .selectFrom("user")
          .selectAll()
          .select(
            sql<string>`(${sql.ref("firstName")} || ' ' || ${sql.ref(
              "lastName",
            )})`.as("fullName"),
          )
          .select(
            sql<number>`
            CASE
              WHEN (${sql.ref("firstName")} || ' ' || ${sql.ref(
  "lastName",
)}) ILIKE ${`${searchQuery}%`} THEN 5
              WHEN ${sql.ref(
    "firstName",
  )} ILIKE ${`${searchQuery}%`} AND ${sql.ref(
  "lastName",
)} ILIKE ${`${searchQuery}%`} THEN 4
              WHEN ${sql.ref("firstName")} ILIKE ${`${searchQuery}%`} THEN 3
              WHEN ${sql.ref("lastName")} ILIKE ${`${searchQuery}%`} THEN 2
              WHEN ${sql.ref("firstName")} ILIKE ${`%${searchQuery}%`} THEN 1.5
              WHEN ${sql.ref("lastName")} ILIKE ${`%${searchQuery}%`} THEN 1
              ELSE 0
            END
          `.as("score"),
          )
          .as("subquery"),
      )
      .where((eb) =>
        eb.or([
          eb("firstName", "ilike", `%${searchQuery}%`),
          eb("lastName", "ilike", `%${searchQuery}%`),
          eb("fullName", "ilike", `%${searchQuery}%`),
        ]),
      )
      .select(({ fn }) =>
        fn.coalesce(fn.count<number>("id"), sql`0`).as("totalResults"),
      )
      .offset(offset)
      .limit(limit)
      .executeTakeFirst(),
  ]);

  return {
    results,
    totalResults: totalResults?.totalResults ?? 0,
  };
};
