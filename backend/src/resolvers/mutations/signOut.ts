import type { MutationResolvers } from "../../types.js";
import { invalidateSession } from "../../auth/session.js";
import { deleteSessionTokenCookie } from "../../auth/utils.js";

export const signOut: MutationResolvers["signOut"] = async (
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
