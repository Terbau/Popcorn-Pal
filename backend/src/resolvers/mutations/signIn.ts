import { verifyPasswordHash } from "../../auth/password.js";
import { createSession, generateSessionToken } from "../../auth/session.js";
import { setSessionTokenCookie } from "../../auth/utils.js";
import { db } from "../../db/index.js";
import type { RemappedMutation } from "../../types";
import type { User } from "../../types/user.js";

export const signIn: RemappedMutation["signIn"] = async (
  _,
  { input },
  { res },
): Promise<User> => {
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
    createdAt: user.createdAt,
    updatedAt: user.updatedAt,
  };
};
