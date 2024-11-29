import { type QueryHookOptions, useQuery } from "@apollo/client";
import type {
  GetUserQuery,
  GetUserQueryVariables,
} from "../graphql/generated/graphql";
import { GET_USER } from "../graphql/queries/user";

export const useUser = (
  options?: QueryHookOptions<GetUserQuery, GetUserQueryVariables>,
) => {
  const { data, ...rest } = useQuery(GET_USER, options);

  return {
    user: data?.getUser,
    ...rest,
  };
};
