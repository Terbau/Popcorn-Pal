import { hashPassword, verifyPasswordStrength } from "../../auth/password.js";
import { createSession, generateSessionToken } from "../../auth/session.js";
import { setSessionTokenCookie } from "../../auth/utils.js";
import { db } from "../../db/index.js";
import type { MutationResolvers } from "../../types.js";
import { type User, UserSignUpInputSchema } from "../../types/user.js";

export const signUp: MutationResolvers["signUp"] = async (
  _,
  { input },
  { res },
): Promise<User> => {
  UserSignUpInputSchema.parse(input);

  const { email, password, firstName, lastName } = input;

  if (!verifyPasswordStrength(password)) {
    throw new Error("Password is too weak");
  }

  const foundUser = await db
    .selectFrom("user")
    .selectAll()
    .where("email", "=", email.toLowerCase())
    .executeTakeFirst();
  if (foundUser) {
    throw new Error("User with that email already exists");
  }

  const hashedPassowrd = await hashPassword(password);

  const user = await db
    .insertInto("user")
    .values({
      email: email.toLowerCase(),
      password: hashedPassowrd,
      firstName,
      lastName,
    })
    .returning([
      "id",
      "email",
      "firstName",
      "lastName",
      "avatarUrl",
      "createdAt",
      "updatedAt",
    ])
    .executeTakeFirstOrThrow();

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
