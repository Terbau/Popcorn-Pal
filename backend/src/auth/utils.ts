import type { IncomingMessage, ServerResponse } from "node:http";

/**
 * Sets the session token cookie in the response headers.
 * @param res - The response object.
 * @param token - The session token.
 * @param expiresAt - The date the session token expires.
 * @returns The response object with the session token cookie set.
 */
export const setSessionTokenCookie = (
  res: ServerResponse<IncomingMessage>,
  token: string,
  expiresAt: Date,
): ServerResponse<IncomingMessage> => {
  const existingCookies = (res.getHeader("Set-Cookie") as string) || [];
  const cookiesArray = Array.isArray(existingCookies)
    ? existingCookies
    : [existingCookies];
  cookiesArray.push(
    `session=${token}; Max-Age=${expiresAt.toUTCString()}; Path=/`,
  );
  res.setHeader("Set-Cookie", cookiesArray);

  return res;
};

/**
 * Deletes the session token cookie from the response headers.
 * @param res - The response object.
 * @returns The response object with the session token cookie deleted.
 */
export const deleteSessionTokenCookie = (
  res: ServerResponse<IncomingMessage>,
): ServerResponse<IncomingMessage> => {
  const existingCookies = (res.getHeader("Set-Cookie") as string) || [];
  const cookiesArray = Array.isArray(existingCookies)
    ? existingCookies
    : [existingCookies];
  cookiesArray.push("session=; Max-Age=0; Path=/");
  res.setHeader("Set-Cookie", cookiesArray);

  return res;
};
