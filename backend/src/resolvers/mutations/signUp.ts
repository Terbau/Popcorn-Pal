import { hashPassword, verifyPasswordStrength } from "../../auth/password.js";
import { db } from "../../db/index.js";
import type { RemappedMutation } from "../../types";
import { type User, UserSignUpInputSchema } from "../../types/user.js";

export const signUp: RemappedMutation["signUp"] = async (
  _,
  { input },
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
      "createdAt",
      "updatedAt",
    ])
    .executeTakeFirstOrThrow();

  return user;
};
