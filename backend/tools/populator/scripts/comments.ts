import type { Kysely } from "kysely";
import type { Database } from "../../../src/db/types";
import { getRandomElement, getRandomInt } from "../utils";
import {
  BASE_CONTENTS,
  BASE_REPLIES,
  BASE_REPLIES_TO_REPLIES,
  USER_IDS,
} from "../constants";

export async function handleCreateComment(
  db: Kysely<Database>,
  movieId: string,
  movieTitle: string,
  parentId: string | null,
  depth: number,
  userIds: string[],
) {
  const tasks = [];

  let amount = 0;
  if (depth === 0) {
    amount = getRandomInt(1, 3);
  } else if (depth === 1) {
    amount = getRandomInt(2, 7);
  } else if (depth === 2) {
    amount = getRandomInt(0, 4);
  } else {
    amount = getRandomInt(0, 2);
  }

  const usedUsersIds = new Set<string>();

  for (let i = 0; i < amount; i++) {
    const toTakeFrom =
      depth === 0
        ? BASE_CONTENTS
        : depth === 1
        ? BASE_REPLIES
        : BASE_REPLIES_TO_REPLIES;
    const content = getRandomElement(toTakeFrom).replace(
      "{movie}",
      `${movieTitle}`,
    );

    if (usedUsersIds.size === userIds.length) {
      break;
    }

    let userId = null;
    while (true) {
      userId = getRandomElement(userIds);
      if (!usedUsersIds.has(userId)) {
        usedUsersIds.add(userId);
        break;
      }
    }

    const tabs = "\t".repeat(depth);
    console.log(`${tabs}- ${content} (${userId})`);

    const baseDate = new Date(Date.now() - 86400000);
    // date based on how deep the comment is. must not surpass the base date

    // 3600000 = 1 hour
    // lower depth = older date
    const createdAt = new Date(baseDate.getTime() + 3600000 * depth);

    const comment = await db
      .insertInto("comment")
      .values({
        content,
        movieId,
        parentId,
        userId,
        createdAt,
      })
      .returning("id")
      .executeTakeFirstOrThrow();

    if (depth < 5) {
      const task = handleCreateComment(
        db,
        movieId,
        movieTitle,
        comment.id,
        depth + 1,
        userIds.filter((id) => id !== userId),
      );
      tasks.push(task);
    }
  }

  await Promise.all(tasks);
}

export async function populateComments(db: Kysely<Database>) {
  const movies = await db.selectFrom("movie").select(["id", "title"]).execute();

  const tasks = [];

  for (const movie of movies) {
    console.log(`\x1b[33m${movie.title}\x1b[0m`);

    const task = handleCreateComment(db, movie.id, movie.title, null, 0, USER_IDS.slice());
    tasks.push(task);
  }

  await Promise.all(tasks);
}
