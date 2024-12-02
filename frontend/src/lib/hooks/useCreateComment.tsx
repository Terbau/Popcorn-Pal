import { type MutationHookOptions, useMutation } from "@apollo/client";
import type {
  CreateCommentMutation,
  CreateCommentMutationVariables,
  GetRecursiveCommentsQuery,
} from "../graphql/generated/graphql";
import { CREATE_COMMENT } from "../graphql/mutations/comment";
import { apolloClient } from "../graphql/apolloClient";
import type { ArrayElement } from "../utils";

type RecursiveComment = ArrayElement<
  GetRecursiveCommentsQuery["getRecursiveComments"]["results"]
>;

export interface UseCreateCommentParams {
  rootParentId: string | null;
  currentUser: RecursiveComment["user"];
}

export const useCreateComment = (
  { rootParentId, currentUser }: UseCreateCommentParams,
  options?: MutationHookOptions<
    CreateCommentMutation,
    CreateCommentMutationVariables
  >,
) => {
  const [createComment, other] = useMutation(CREATE_COMMENT, {
    ...options,
    onCompleted: (args) => {
      try {
        apolloClient.cache.modify({
          id: apolloClient.cache.identify({
            __typename: "PaginatedRecursiveCommentsResult",
            movieId: args.createComment.movieId,
            parentId: rootParentId, // Important to use the parentId from the hook params
          }),
          fields: {
            results(existing, { toReference }) {
              const newComment: RecursiveComment = {
                ...args.createComment,
                user: currentUser,
                hasUpvoted: false,
                hasDownvoted: false,
                totalComments: 0,
                depth: -1, // Doesn't matter since a comment that has been added to the cache
                // will never allow any sub-comments to be loaded from a "load more"
                voteRatio: 0,
                __typename: "RecursiveComment",
              };

              return [toReference(newComment, true), ...(existing ?? [])];
            },
          },
        });

        // If the comment is a reply, we need to update the totalComments of the parent comment
        if (args.createComment.parentId) {
          apolloClient.cache.modify({
            id: apolloClient.cache.identify({
              __typename: "RecursiveComment",
              id: args.createComment.parentId,
            }),
            fields: {
              totalComments(existingTotalComments) {
                return existingTotalComments + 1;
              },
            },
          });
        }
      } finally {
        options?.onCompleted?.(args);
      }
    },
  });

  return [createComment, other] as const;
};
