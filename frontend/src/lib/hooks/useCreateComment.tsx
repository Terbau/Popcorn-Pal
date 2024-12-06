import { type MutationHookOptions, useMutation } from "@apollo/client";
import type {
  CreateCommentMutation,
  CreateCommentMutationVariables,
  GetRecursiveCommentsQuery,
} from "../graphql/generated/graphql";
import { CREATE_COMMENT } from "../graphql/mutations/comment";
import type { ArrayElement } from "../utils/typeUtils";

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
    update: (cache, { data }) => {
      cache.modify({
        id: cache.identify({
          __typename: "PaginatedRecursiveCommentsResult",
          movieId: data?.createComment.movieId,
          parentId: rootParentId, // Important to use the parentId from the hook params
        }),
        fields: {
          results(existing, { toReference }) {
            if (data?.createComment) {
              const newComment: RecursiveComment = {
                ...data?.createComment,
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
            }
            return existing;
          },
        },
      });

      // If the comment is a reply, we need to update the totalComments of the parent comment
      if (data?.createComment.parentId) {
        cache.modify({
          id: cache.identify({
            __typename: "RecursiveComment",
            id: data?.createComment.parentId,
          }),
          fields: {
            totalComments(existingTotalComments) {
              return existingTotalComments + 1;
            },
          },
        });
      }
    },
  });

  return [createComment, other] as const;
};
