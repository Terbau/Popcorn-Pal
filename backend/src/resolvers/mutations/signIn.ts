import { verifyPasswordHash } from "../../auth/password.js";
import { createSession, generateSessionToken } from "../../auth/session.js";
import { setSessionTokenCookie } from "../../auth/utils.js";
import { db } from "../../db/index.js";
import type { MutationResolvers } from "../../types.js";

export const signIn: MutationResolvers["signIn"] = async (
  _,
  { input },
  { res },
) => {
  const { email, password } = input;

  const user = await db
    .selectFrom("user")
    .selectAll()
    .where("email", "=", email.toLowerCase())
    .executeTakeFirst();

  if (!user) {
    throw new Error("User not found");
  }

  const passwordMatch = await verifyPasswordHash(user.password, password);
  if (!passwordMatch) {
    throw new Error("Invalid password");
  }

  const token = generateSessionToken();
  const session = await createSession(token, user.id);

  setSessionTokenCookie(res, token, session.expiresAt);

  return {
    id: user.id,
    email: user.email,
    firstName: user.firstName,
    lastName: user.lastName,
    avatarUrl: user.avatarUrl,
    createdAt: user.createdAt,
    updatedAt: user.updatedAt,
  };
};
