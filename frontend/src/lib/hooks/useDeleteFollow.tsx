import { type MutationHookOptions, useMutation } from "@apollo/client";
import type {
  DeleteFollowMutation,
  DeleteFollowMutationVariables,
} from "../graphql/generated/graphql";
import { DELETE_FOLLOW } from "../graphql/mutations/user";

interface UseDeleteFollowParams {
  currentUserId: string;
}

export const useDeleteFollow = (
  { currentUserId }: UseDeleteFollowParams,
  options?: MutationHookOptions<
    DeleteFollowMutation,
    DeleteFollowMutationVariables
  >,
) => {
  const [deleteFollow, other] = useMutation(DELETE_FOLLOW, {
    ...options,
    update: (cache, { data }, { variables }) => {
      if (data?.deleteFollow) {
        cache.modify({
          id: cache.identify({
            __typename: "FollowerInfo",
            userId: variables?.userId,
          }),
          fields: {
            currentUserIsFollowing() {
              return false;
            },
            followerCount(existing) {
              return (existing ?? 0) - 1;
            },
          },
        });

        cache.modify({
          id: cache.identify({
            __typename: "FollowerInfo",
            userId: currentUserId,
          }),
          fields: {
            followingCount(existing) {
              return (existing ?? 0) - 1;
            },
          },
        });
      }
    },
  });

  return [deleteFollow, other] as const;
};
