import { invalidateSession } from "../../auth/session.js";
import { deleteSessionTokenCookie } from "../../auth/utils.js";
import type { RemappedMutation } from "../../types";

export const signOut: RemappedMutation["signOut"] = async (
  _,
  __,
  { session, res },
) => {
  if (session) {
    await invalidateSession(session.id);
  }

  deleteSessionTokenCookie(res);
  return true;
};
