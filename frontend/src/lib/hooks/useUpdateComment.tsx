import { type MutationHookOptions, useMutation } from "@apollo/client";
import type {
  UpdateCommentMutation,
  UpdateCommentMutationVariables,
} from "../graphql/generated/graphql";
import { UPDATE_COMMENT } from "../graphql/mutations/comment";

export const useUpdateComment = (
  options?: MutationHookOptions<
    UpdateCommentMutation,
    UpdateCommentMutationVariables
  >,
) => {
  const [updateComment, other] = useMutation(UPDATE_COMMENT, {
    ...options,
    update: (cache, { data }) => {
      cache.modify({
        id: cache.identify({
          __typename: "RecursiveComment",
          id: data?.updateComment.id,
        }),
        fields: {
          content() {
            return data?.updateComment.content;
          },
          updatedAt() {
            return data?.updateComment.updatedAt;
          },
        },
      });
    },
  });

  return [updateComment, other] as const;
};
