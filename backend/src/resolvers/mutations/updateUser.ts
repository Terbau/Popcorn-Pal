import { db } from "../../db/index.js";
import { uploadAvatar } from "../../minio/functions.js";
import type { RemappedMutation } from "../../types.js";
import { type User, UserUpdateInputSchema } from "../../types/user.js";

export const updateUser: RemappedMutation["updateUser"] = async (
  _,
  { input },
  { user },
) => {
  if (!user) {
    throw new Error("Not authenticated");
  }

  const { firstName, lastName, email, avatarFile } =
    UserUpdateInputSchema.parse(input);

  let publicAvatarUrl = undefined;

  if (avatarFile !== undefined) {
    if (avatarFile !== null) {
      const { publicUrl } = await uploadAvatar(avatarFile);
      publicAvatarUrl = publicUrl;
    } else {
      publicAvatarUrl = null;
    }
  }

  const fields: Partial<User> = { firstName, lastName, email };
  if (publicAvatarUrl !== undefined) {
    fields.avatarUrl = publicAvatarUrl;
  }

  const updatedUser = await db
    .updateTable("user")
    .set({
      ...fields,
      updatedAt: new Date(),
    })
    .where("id", "=", user.id)
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

  return updatedUser;
};
