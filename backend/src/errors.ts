import { GraphQLError } from "graphql";

export const throwNotAuthenticatedError = (message?: string) => {
  throw new GraphQLError(message ?? "Not authenticated", {
    extensions: { code: "UNAUTHENTICATED" },
  });
};
