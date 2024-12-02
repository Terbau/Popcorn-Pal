import { type QueryHookOptions, useQuery } from "@apollo/client";
import type {
  GetRecursiveCommentsQuery,
  GetRecursiveCommentsQueryVariables,
} from "../graphql/generated/graphql";
import { GET_RECURSIVE_COMMENTS } from "../graphql/queries/comment";
import { useMemo } from "react";
import type { ArrayElement } from "../utils";

export const DEFAULT_RECURSIVE_COMMENTS_LIMIT_AT_DEPTH = 3;
export const DEFAULT_RECURSIVE_COMMENTS_MAX_DEPTH = 2;
export const DEFAULT_RECURSIVE_COMMENTS_PAGE_SIZE = 30;
export const DEFAULT_RECURSIVE_COMMENTS_ORDER_DIRECTION = "desc";

export interface UseRecursiveCommentsParams {
  movieId: string;
  parentId?: string | null;
  limitAtDepth?: number;
  maxDepth?: number;
  page?: number;
  pageSize?: number;
  orderDirection?: "asc" | "desc";
}

export interface RecursiveCommentNode
  extends ArrayElement<
    GetRecursiveCommentsQuery["getRecursiveComments"]["results"]
  > {
  comments: RecursiveCommentNode[];
}

// Function that takes the result of the query and returns a sort of tree structure where each comment has a list of comments based on the parentId
const createCommentTree = (
  comments: GetRecursiveCommentsQuery["getRecursiveComments"]["results"],
  rootParentId: string | null,
): RecursiveCommentNode[] => {
  const commentMap = new Map<string, RecursiveCommentNode>();

  for (const comment of comments) {
    commentMap.set(comment.id, {
      ...comment,
      comments: [],
    });
  }

  const rootComments: RecursiveCommentNode[] = [];

  for (const comment of commentMap.values()) {
    if (comment.parentId === rootParentId) {
      rootComments.push(comment);
    } else if (comment.parentId) {
      const parent = commentMap.get(comment.parentId);
      if (parent) {
        parent.comments.push(comment);
      }
    }
  }

  return rootComments;
};

export const useRecursiveComments = (
  {
    movieId,
    parentId,
    limitAtDepth = DEFAULT_RECURSIVE_COMMENTS_LIMIT_AT_DEPTH,
    maxDepth = DEFAULT_RECURSIVE_COMMENTS_MAX_DEPTH,
    page = 0,
    pageSize = DEFAULT_RECURSIVE_COMMENTS_PAGE_SIZE,
    orderDirection = DEFAULT_RECURSIVE_COMMENTS_ORDER_DIRECTION,
  }: UseRecursiveCommentsParams,
  options?: QueryHookOptions<
    GetRecursiveCommentsQuery,
    GetRecursiveCommentsQueryVariables
  >,
) => {
  const { data, ...rest } = useQuery(GET_RECURSIVE_COMMENTS, {
    ...options,
    variables: {
      movieId,
      parentId,
      limitAtDepth,
      maxDepth,
      page,
      pageSize,
      orderDirection,
      ...options?.variables,
    },
  });
  const tree = useMemo(
    () =>
      createCommentTree(
        data?.getRecursiveComments.results ?? [],
        parentId ?? null,
      ),
    [data?.getRecursiveComments.results, parentId],
  );

  return {
    rootComment: data?.getComment,
    comments: tree,
    totalResults: data?.getRecursiveComments.totalResults ?? 0,
    ...rest,
  };
};
