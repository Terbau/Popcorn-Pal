import { type QueryHookOptions, useQuery } from "@apollo/client";
import type {
  GetFollowerInfoQuery,
  GetFollowerInfoQueryVariables,
} from "../graphql/generated/graphql";
import { GET_FOLLOWER_INFO } from "../graphql/queries/user";

interface UseFollowerInfoParams {
  userId: string;
}

export const useFollowerInfo = (
  { userId }: UseFollowerInfoParams,
  options?: QueryHookOptions<
    GetFollowerInfoQuery,
    GetFollowerInfoQueryVariables
  >,
) => {
  const { data, ...rest } = useQuery(GET_FOLLOWER_INFO, {
    ...options,
    variables: {
      userId,
      ...options?.variables,
    },
  });

  return {
    followerInfo: data?.getFollowerInfo,
    ...rest,
  };
};
