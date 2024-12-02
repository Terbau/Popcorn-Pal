import { type MutationHookOptions, useMutation } from "@apollo/client";
import type {
  UpsertCommentVoteMutation,
  UpsertCommentVoteMutationVariables,
} from "../graphql/generated/graphql";
import { UPSERT_COMMENT_VOTE } from "../graphql/mutations/comment";
import { apolloClient } from "../graphql/apolloClient";

// We need the current type in order to update the cache correctly.
export interface UseUpsertCommentVoteProps {
  type?: "UPVOTE" | "DOWNVOTE";
}

export const useUpsertCommentVote = (
  { type }: UseUpsertCommentVoteProps,
  options?: MutationHookOptions<
    UpsertCommentVoteMutation,
    UpsertCommentVoteMutationVariables
  >,
) => {
  const [upsertCommentVote, other] = useMutation(UPSERT_COMMENT_VOTE, {
    ...options,
    onCompleted: (args) => {
      try {
        apolloClient.cache.modify({
          id: apolloClient.cache.identify({
            __typename: "RecursiveComment",
            id: args.upsertCommentVote.commentId,
          }),
          fields: {
            hasUpvoted() {
              return args.upsertCommentVote.type === "UPVOTE";
            },
            hasDownvoted() {
              return args.upsertCommentVote.type === "DOWNVOTE";
            },
            voteRatio(existing) {
              const changeAmount = type !== undefined ? 2 : 1;

              return (
                existing +
                (args.upsertCommentVote.type === "UPVOTE"
                  ? changeAmount
                  : -changeAmount)
              );
            },
          },
        });
      } finally {
        options?.onCompleted?.(args);
      }
    },
  });

  return [upsertCommentVote, other] as const;
};
