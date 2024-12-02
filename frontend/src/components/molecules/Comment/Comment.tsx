import { cn, createInitials, formatRelativeTime } from "@/lib/utils";
import { type ComponentProps, useEffect, useState } from "react";
import { Avatar } from "../Avatar/Avatar";
import { ToggleIcon } from "../ToggleIcon/ToggleIcon";
import { AddComment } from "../AddComment";
import { useAuth } from "@/lib/context/authContext";
import { useLocation } from "react-router-dom";
import { Icon } from "@iconify/react/dist/iconify.js";
import {
  SimpleDropdownMenu,
  type SimpleDropdownMenuItem,
} from "../DropdownMenu/SimpleDropdownMenu";
import { toast } from "react-toastify";
import { useDeleteComment } from "@/lib/hooks/useDeleteComment";
import { OptionalLink } from "@/components/atoms/OptionalLink";
import { EditComment } from "../EditComment";
import { useUpsertCommentVote } from "@/lib/hooks/useUpsertCommentVote";
import { useDeleteCommentVote } from "@/lib/hooks/useDeleteCommentVote";
import { ConfirmModal } from "../ConfirmModal/ConfirmModal";

export interface CommentProps extends ComponentProps<"div"> {
  commentId: string;
  movieId: string;
  content: string;
  parentId: string | null;
  createdAt: Date;
  updatedAt?: Date;
  deletedAt?: Date;
  userId?: string;
  userAvatarUrl?: string;
  userFirstName?: string;
  userLastName?: string;
  voteRatio: number;
  currentUserHasUpvoted: boolean;
  currentUserHasDownvoted: boolean;
  hasMoreComments?: boolean;
  hasMoreSiblingComments?: boolean;
  parentHasMoreComments?: boolean;
  hasTopPadding?: boolean;
  isAtLastDepthWithMoreComments?: boolean;
  isRootParent?: boolean;
  onUpvoteClick?: () => void;
  onDownvoteClick?: () => void;
  onNavigateToComment?: (commentId: string) => void;
}

export const Comment = ({
  commentId,
  movieId,
  content,
  parentId,
  createdAt,
  updatedAt,
  deletedAt,
  userId,
  userAvatarUrl,
  userFirstName,
  userLastName,
  voteRatio,
  currentUserHasUpvoted,
  currentUserHasDownvoted,
  onUpvoteClick,
  onDownvoteClick,
  hasTopPadding = true,
  hasMoreComments = true,
  isRootParent = false,
  hasMoreSiblingComments = true,
  parentHasMoreComments = false,
  isAtLastDepthWithMoreComments = false,
  onNavigateToComment,
  className,
  ...props
}: CommentProps) => {
  const { currentUser } = useAuth();
  const location = useLocation();

  const [replyInputOpen, setReplyInputOpen] = useState(false);
  const [editInputOpen, setEditInputOpen] = useState(false);
  const [deleteConfirmModalOpen, setDeleteConfirmModalOpen] = useState(false);

  const currentUserVoteType = currentUserHasUpvoted
    ? "UPVOTE"
    : currentUserHasDownvoted
      ? "DOWNVOTE"
      : undefined;

  const [deleteComment] = useDeleteComment({
    onCompleted: () => {
      toast.success("Comment deleted successfully");
    },
    onError: () => {
      toast.error("Failed to delete comment");
    },
  });
  const [upsertCommentVote] = useUpsertCommentVote(
    { type: currentUserVoteType },
    {
      onError: () => {
        toast.error("Failed to update comment vote");
      },
    },
  );
  const [deleteCommentVote] = useDeleteCommentVote(
    { commentId, type: currentUserVoteType },
    {
      onError: () => {
        toast.error("Failed to delete comment vote");
      },
    },
  );

  const hasParent = Boolean(parentId);
  const isDeleted = Boolean(deletedAt);
  const fallbackInitials = createInitials(userFirstName, userLastName);
  const fullName = isDeleted ? "*Deleted*" : `${userFirstName} ${userLastName}`;
  const fixedContent = isDeleted ? "Comment has been deleted" : content;

  const moreOptionsGroups: SimpleDropdownMenuItem[][] = [
    [
      {
        label: "Copy share link",
        icon: "carbon:link",
        onClick: () => {
          const currentLocation = `${window.location.origin}/project2${location.pathname}`;
          navigator.clipboard.writeText(
            `${currentLocation}?commentId=${commentId}`,
          );
        },
      },
      {
        label: "Open in single thread",
        icon: "majesticons:open",
        onClick: () => onNavigateToComment?.(commentId),
      },
    ],
  ];

  if (currentUser && currentUser.id === userId) {
    moreOptionsGroups.push([
      {
        label: "Edit comment",
        icon: "carbon:edit",
        onClick: () => setEditInputOpen(true),
      },
      {
        label: "Delete comment",
        color: "red",
        icon: "material-symbols:delete-outline",
        onClick: () => setDeleteConfirmModalOpen(true),
      },
    ]);
  }

  const handleUpvoteClick = () => {
    try {
      if (currentUserHasUpvoted) {
        deleteCommentVote({ variables: { commentId } });
      } else {
        upsertCommentVote({
          variables: { commentId, input: { type: "UPVOTE" } },
        });
      }
    } finally {
      onUpvoteClick?.();
    }
  };

  const handleDownvoteClick = () => {
    try {
      if (currentUserHasDownvoted) {
        deleteCommentVote({ variables: { commentId } });
      } else {
        upsertCommentVote({
          variables: { commentId, input: { type: "DOWNVOTE" } },
        });
      }
    } finally {
      onDownvoteClick?.();
    }
  };

  useEffect(() => {
    if (editInputOpen) {
      setReplyInputOpen(false);
    }
  }, [editInputOpen]);

  useEffect(() => {
    if (replyInputOpen) {
      setEditInputOpen(false);
    }
  }, [replyInputOpen]);

  return (
    <>
      <ConfirmModal
        type="delete"
        onConfirm={() => deleteComment({ variables: { id: commentId } })}
        onCancel={() => setDeleteConfirmModalOpen(false)}
        open={deleteConfirmModalOpen}
        onOpenChange={setDeleteConfirmModalOpen}
      />
      <div
        className={cn(
          "flex flex-row",
          { "ml-4": hasParent && !isRootParent },
          className,
        )}
        {...props}
      >
        {hasParent &&
          !isRootParent &&
          (hasMoreSiblingComments || parentHasMoreComments ? (
            <div className="grow w-px max-w-px bg-brand-10" />
          ) : (
            <div className="w-px max-w-px h-[29px] bg-brand-10" />
          ))}

        <div
          className={cn("flex flex-row gap-2 w-full", {
            "pt-6": hasTopPadding,
          })}
        >
          <div className="flex flex-col items-center">
            <div className="flex flex-row items-center w-fit">
              {/* same as above but this time an arc that goes from top left to center right */}
              {hasParent && !isRootParent && (
                <div className="h-6 w-6 border border-transparent border-b-brand-10 rounded-full rotate-45 -ml-px -mb-px -mr-3 -mt-6" />
              )}
              {hasParent && !isRootParent && (
                <div className="bg-brand-10 h-px w-2" />
              )}
              <OptionalLink
                to={`/profile/${userId}`}
                disabled={isDeleted}
                className={cn({ grayscale: isDeleted })}
              >
                <Avatar
                  src={userAvatarUrl}
                  size="sm"
                  fallback={fallbackInitials}
                  overrideSizeChange
                />
              </OptionalLink>
            </div>
            {(hasMoreComments || isAtLastDepthWithMoreComments) && (
              <div
                className={cn("bg-brand-10 grow w-px", {
                  "ml-5": hasParent && !isRootParent,
                })}
              />
            )}
          </div>
          <div
            className={cn("flex flex-col w-full", {
              "text-slate-10": isDeleted,
            })}
          >
            <div className="flex flex-row gap-1.5 items-center whitespace-nowrap">
              <OptionalLink
                to={`/profile/${userId}`}
                disabled={isDeleted}
                className={cn("text-sm font-semibold w-fit")}
              >
                {fullName}
              </OptionalLink>
              •
              <span
                className={cn(
                  "text-xs truncate",
                  isDeleted ? "text-slate-10" : "text-brand-11",
                )}
              >
                {formatRelativeTime(createdAt)}
              </span>
              {updatedAt && !isDeleted && (
                <>
                  <span className="hidden sm:block">•</span>
                  <span className="text-xs text-brand-11 hidden sm:block">
                    edited {formatRelativeTime(updatedAt)}
                  </span>
                </>
              )}
            </div>
            {editInputOpen && currentUser ? (
              <EditComment
                className="[&>div>textarea]:text-sm w-full my-1"
                commentId={commentId}
                content={content}
                isOpen={editInputOpen}
                onClose={() => setEditInputOpen(false)}
              />
            ) : (
              <p className="text-sm">{fixedContent}</p>
            )}
            <div className={cn("flex flex-row gap-2 items-center mt-0.5")}>
              <ToggleIcon
                className={cn(
                  "h-5 w-5",
                  isDeleted ? "text-slate-7" : "text-brand-12",
                  { "text-orange-9": currentUserHasUpvoted },
                  { "text-slate-7": currentUserHasUpvoted && isDeleted },
                )}
                aria-label="Upvote"
                toggledIcon="icon-park-solid:up-two"
                untoggledIcon="icon-park-outline:up-two"
                pressed={currentUserHasUpvoted}
                onPressedChange={handleUpvoteClick}
                disabled={isDeleted || !currentUser}
              />
              <p className="text-sm">{voteRatio}</p>
              <ToggleIcon
                className={cn(
                  "h-5 w-5",
                  isDeleted ? "text-slate-7" : "text-brand-12",
                  { "text-orange-9": currentUserHasDownvoted },
                  { "text-slate-7": currentUserHasDownvoted && isDeleted },
                )}
                aria-label="Downvote"
                toggledIcon="icon-park-solid:down-two"
                untoggledIcon="icon-park-outline:down-two"
                pressed={currentUserHasDownvoted}
                onPressedChange={handleDownvoteClick}
                disabled={isDeleted || !currentUser}
              />
              {currentUser && (
                <button
                  type="button"
                  className={cn(
                    "ml-1 text-sm",
                    isDeleted
                      ? "text-slate-8"
                      : "text-blue-11 hover:text-blue-12",
                  )}
                  onClick={() => setReplyInputOpen((prev) => !prev)}
                  disabled={isDeleted}
                >
                  Reply
                </button>
              )}

              <SimpleDropdownMenu groups={moreOptionsGroups}>
                <div className="px-2 mt-0.5 py-0.5 hover:bg-brand-4 rounded-full">
                  <Icon
                    icon="lucide:more-horizontal"
                    className="text-brand-10"
                  />
                </div>
              </SimpleDropdownMenu>
            </div>
            {replyInputOpen && currentUser && (
              // <div className="my-3">
              <AddComment
                className="[&>div>textarea]:text-sm w-full my-3"
                movieId={movieId}
                parentId={commentId}
                currentUser={currentUser}
                commentPrefix="Reply"
                isOpen={replyInputOpen}
                onClose={() => setReplyInputOpen(false)}
              />
              // </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};
