import { type QueryHookOptions, useQuery } from "@apollo/client";
import type {
  GetCurrentUserQuery,
  GetCurrentUserQueryVariables,
} from "../graphql/generated/graphql";
import { GET_CURRENT_USER } from "../graphql/queries/user";

export const useCurrentUser = (
  options?: QueryHookOptions<GetCurrentUserQuery, GetCurrentUserQueryVariables>,
) => {
  const { data, ...rest } = useQuery(GET_CURRENT_USER, options);

  return {
    user: data?.getUser,
    ...rest,
  };
};
