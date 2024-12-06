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
  // Use schema validation to ensure that the arguments are correct
  const { email, password, firstName, lastName } =
    UserSignUpInputSchema.parse(input);

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

  const hashedPassword = await hashPassword(password);

  const user = await db
    .insertInto("user")
    .values({
      email: email.toLowerCase(),
      password: hashedPassword,
      firstName,
      lastName,
    })
    // We dont want to return the password hash, therefore we have
    // to specify all the other fields.
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

  // The the cookie with the session token
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
