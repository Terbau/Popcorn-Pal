import { type MutationHookOptions, useMutation } from "@apollo/client";
import type {
  CreateFollowMutation,
  CreateFollowMutationVariables,
} from "../graphql/generated/graphql";
import { CREATE_FOLLOW } from "../graphql/mutations/user";

interface UseCreateFollowParams {
  currentUserId: string;
}

export const useCreateFollow = (
  { currentUserId }: UseCreateFollowParams,
  options?: MutationHookOptions<
    CreateFollowMutation,
    CreateFollowMutationVariables
  >,
) => {
  const [createFollow, other] = useMutation(CREATE_FOLLOW, {
    ...options,
    update: (cache, { data }, { variables }) => {
      if (data?.createFollow) {
        cache.modify({
          id: cache.identify({
            __typename: "FollowerInfo",
            userId: variables?.userId,
          }),
          fields: {
            currentUserIsFollowing() {
              return true;
            },
            followerCount(existing) {
              return (existing ?? 0) + 1;
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
              return (existing ?? 0) + 1;
            },
          },
        });
      }
    },
  });

  return [createFollow, other] as const;
};
