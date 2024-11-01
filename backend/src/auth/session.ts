// functions retrieved from https://lucia-auth.com/sessions/basic-api/postgresql

import {
  encodeBase32LowerCaseNoPadding,
  encodeHexLowerCase,
} from "@oslojs/encoding";
import { sha256 } from "@oslojs/crypto/sha2";
import type { Session, SessionValidationResult } from "../types/auth";
import { db } from "../db/index.js";
import crypto from "node:crypto";

export const generateSessionToken = (): string => {
  const bytes = new Uint8Array(20);
  crypto.getRandomValues(bytes);
  const token = encodeBase32LowerCaseNoPadding(bytes);
  return token;
};

export const createSession = async (
  token: string,
  userId: string,
): Promise<Session> => {
  const sessionId = encodeHexLowerCase(sha256(new TextEncoder().encode(token)));
  const session: Session = {
    id: sessionId,
    userId,
    expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 24 * 30),
  };

  await db.insertInto("session").values(session).execute();

  return session;
};

export const validateSessionToken = async (
  token: string,
): Promise<SessionValidationResult> => {
  const sessionId = encodeHexLowerCase(sha256(new TextEncoder().encode(token)));

  const session = await db
    .selectFrom("session")
    .selectAll("session")
    .where("session.id", "=", sessionId)
    .executeTakeFirst();

  if (!session) {
    return { session: null, user: null };
  }

  if (Date.now() >= session.expiresAt.getTime()) {
    await db
      .deleteFrom("session")
      .where("session.id", "=", sessionId)
      .execute();
    return { session: null, user: null };
  }
  if (Date.now() >= session.expiresAt.getTime() - 1000 * 60 * 60 * 24 * 15) {
    session.expiresAt = new Date(Date.now() + 1000 * 60 * 60 * 24 * 30);
    await db
      .updateTable("session")
      .set({ expiresAt: session.expiresAt })
      .where("session.id", "=", sessionId)
      .execute();
  }

  const user = await db
    .selectFrom("user")
    .selectAll("user")
    .where("user.id", "=", session.userId)
    .executeTakeFirst();

  if (!user) {
    return { session: null, user: null };
  }

  return { session, user };
};

export const invalidateSession = async (sessionId: string): Promise<void> => {
  await db.deleteFrom("session").where("session.id", "=", sessionId).execute();
}


