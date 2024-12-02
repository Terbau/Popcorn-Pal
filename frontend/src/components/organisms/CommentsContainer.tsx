import type { useRecursiveComments } from "@/lib/hooks/useRecursiveComments";
import type { ComponentProps } from "react";
import { Comment } from "../molecules/Comment/Comment";
import { cn } from "@/lib/utils";
import { MoreComments } from "@/components/molecules/Comment/MoreComments";
import { LoadingButton } from "@/components/molecules/LoadingButton/LoadingButton";

interface CommentsContainerProps extends ComponentProps<"div"> {
  parentId: string | null;
  comments: ReturnType<typeof useRecursiveComments>["comments"];
  totalComments: number;
  maxDepth: number;
  depth?: number;
  rootParentId: string | null;
  isLoadingMoreParentIds?: (string | null)[];
  onMoreCommentsClick?: (
    parentId: string | null,
    depth: number,
    parentSubCommentsLength: number,
  ) => void;
  onNavigateToComment?: (commentId: string) => void;
}

export const CommentsContainer = ({
  parentId,
  comments,
  maxDepth,
  totalComments,
  depth = 0,
  isLoadingMoreParentIds = [],
  onMoreCommentsClick,
  onNavigateToComment,
  rootParentId = null,
  className,
  ...props
}: CommentsContainerProps) => {
  const isMaxDepth = depth >= maxDepth + 1;
  const hasMoreComments = (isMaxDepth ? 0 : comments.length) < totalComments;
  const isLoadingMore = isLoadingMoreParentIds.includes(parentId);

  return (
    <div className={cn("w-full", className)} {...props}>
      {!isMaxDepth &&
        comments.map((comment, i) => {
          const isLastSibling = i === comments.length - 1;
          const isRootParent = comment.id === rootParentId;

          return (
            <div key={comment.id} className="flex flex-col">
              <Comment
                commentId={comment.id}
                movieId={comment.movieId}
                content={comment.content}
                parentId={comment.parentId ?? null}
                isRootParent={isRootParent}
                createdAt={comment.createdAt}
                updatedAt={comment.updatedAt}
                deletedAt={comment.deletedAt}
                userId={comment?.user?.id}
                userFirstName={comment?.user?.firstName}
                userLastName={comment?.user?.lastName}
                voteRatio={comment.voteRatio}
                currentUserHasUpvoted={comment.hasUpvoted}
                currentUserHasDownvoted={comment.hasDownvoted}
                hasMoreComments={comment.comments.length > 0}
                hasMoreSiblingComments={!isLastSibling}
                parentHasMoreComments={hasMoreComments}
                hasTopPadding={!(depth === 0 && i === 0)}
                isAtLastDepthWithMoreComments={
                  depth === maxDepth && comment.totalComments > 0
                }
                onNavigateToComment={onNavigateToComment}
              />
              {(comment.comments.length > 0 || maxDepth) && (
                <div className="flex flex-row -ml-[1.5px]">
                  <div
                    className={cn("w-px max-w-px", {
                      "bg-brand-10 ml-[17.5px]":
                        (!isLastSibling && parentId) ||
                        (hasMoreComments && depth !== 0),
                      "ml-[17.5px]":
                        isLastSibling && comment.parentId && !isRootParent,
                    })}
                  />

                  <CommentsContainer
                    rootParentId={rootParentId}
                    parentId={comment.id}
                    comments={comment.comments}
                    maxDepth={maxDepth}
                    totalComments={comment.totalComments}
                    depth={depth + 1}
                    isLoadingMoreParentIds={isLoadingMoreParentIds}
                    onMoreCommentsClick={onMoreCommentsClick}
                    onNavigateToComment={onNavigateToComment}
                    className={cn({
                      "ml-[19px]": comment.parentId && !isRootParent,
                    })}
                  />
                </div>
              )}
            </div>
          );
        })}
      {hasMoreComments &&
        (depth !== 0 ? (
          <MoreComments
            isLoading={isLoadingMore}
            onClick={() =>
              onMoreCommentsClick?.(parentId, depth, comments.length)
            }
          />
        ) : (
          rootParentId === null && (
            <LoadingButton
              isLoading={isLoadingMore}
              className="mt-6"
              variant="secondary"
              size="sm"
              onClick={() =>
                onMoreCommentsClick?.(parentId, depth, comments.length)
              }
            >
              Load more comments
            </LoadingButton>
          )
        ))}
    </div>
  );
};
