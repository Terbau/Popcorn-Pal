import type { IncomingMessage, ServerResponse } from "node:http";

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
