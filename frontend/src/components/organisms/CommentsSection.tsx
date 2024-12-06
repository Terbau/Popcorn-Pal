import { useAuth } from "@/lib/context/authContext";
import { apolloClient } from "@/lib/graphql/apolloClient";
import { useRecursiveComments } from "@/lib/hooks/useRecursiveComments";
import { cn } from "@/lib/utils/classUtils";
import type { Options } from "nuqs";
import {
  type ComponentProps,
  createContext,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { Button } from "../atoms/Button/Button";
import { AddComment } from "../molecules/AddComment/AddComment";
import { CommentsContainer } from "./CommentsContainer";
import { Separator } from "../atoms/Separator/Separator";
import { useResponsive } from "ahooks";
import { Spinner } from "../atoms/Spinner/Spinner";

const MAX_COMMENT_DEPTH_DESKTOP = 6;
const MAX_COMMENT_DEPTH_TABLET = 4;
const MAX_COMMENT_DEPTH_MOBILE = 2;

const SUB_COMMENTS_PAGE_SIZE = 3;
const ROOT_COMMENTS_PAGE_SIZE = 15;

// Context for storing rootParentId
export const ParentIdContext = createContext<string | null>(null);

interface CommentsSectionProps extends ComponentProps<"section"> {
  movieId: string;
  rootParentId: string | null;
  setRootParentId?: (
    value: string | ((old: string | null) => string | null) | null,
    options?: Options,
  ) => Promise<URLSearchParams>;
}

export const CommentsSection = ({
  movieId,
  rootParentId,
  setRootParentId,
  className,
  ...props
}: CommentsSectionProps) => {
  const { currentUser } = useAuth();
  const sectionRef = useRef<HTMLDivElement>(null);

  const [isLoadingMoreParentIds, setIsLoadingMoreParentIds] = useState<
    (string | null)[]
      >([]);
  const [commentInputOpen, setCommentInputOpen] = useState(false);
  const [maxCommentDepth, setMaxCommentDepth] = useState(
    MAX_COMMENT_DEPTH_DESKTOP,
  );

  const responsive = useResponsive();

  // Use the responsive hook to determine the max comment depth based on the screen size
  useEffect(() => {
    const { sm, md } = responsive;

    if (sm && md) {
      setMaxCommentDepth(MAX_COMMENT_DEPTH_DESKTOP);
    } else if (sm) {
      setMaxCommentDepth(MAX_COMMENT_DEPTH_TABLET);
    } else {
      setMaxCommentDepth(MAX_COMMENT_DEPTH_MOBILE);
    }
  }, [responsive]);

  const { rootComment, comments, totalResults, fetchMore, loading } =
    useRecursiveComments({
      movieId,
      parentId: rootParentId,
      maxDepth: maxCommentDepth,
      pageSize: ROOT_COMMENTS_PAGE_SIZE,
    });

  // This function is responsible for fetching more comments. It can be called
  // by all the different show more buttons in the comments section.
  const handleMoreCommentsClick = useCallback(
    async (
      parentId: string | null,
      depth: number,
      parentSubCommentsLength: number,
    ) => {
      const newDepth = maxCommentDepth - depth;

      // The max depth has been reached. Instead of fetching more comments, we should
      // navigate to a single comment thread. This is done by setting the rootParentId.
      if (newDepth < 0 || !movieId) {
        setRootParentId?.(parentId);
        sectionRef.current?.scrollIntoView({ behavior: "smooth" });
        return;
      }

      let nextPage: number;
      let pageSize: number;

      if (parentId === rootParentId) {
        nextPage = Math.ceil(comments.length / ROOT_COMMENTS_PAGE_SIZE);
        pageSize = ROOT_COMMENTS_PAGE_SIZE;
      } else {
        nextPage = Math.ceil(parentSubCommentsLength / SUB_COMMENTS_PAGE_SIZE);
        pageSize = SUB_COMMENTS_PAGE_SIZE;
      }

      setIsLoadingMoreParentIds([...isLoadingMoreParentIds, parentId]);
      const { data } = await fetchMore({
        variables: {
          movieId: movieId,
          parentId,
          maxDepth: newDepth,
          page: nextPage,
          pageSize: pageSize,
        },
      });
      setIsLoadingMoreParentIds((prev) => prev.filter((id) => id !== parentId));

      // Need to modify the cache at the root parent level in order
      // to append the new comments to the existing ones
      if (rootParentId !== parentId) {
        apolloClient.cache.modify({
          id: apolloClient.cache.identify({
            __typename: "PaginatedRecursiveCommentsResult",
            movieId: movieId,
            parentId: rootParentId,
          }),
          fields: {
            results(existing, { toReference }) {
              return [
                ...(existing ?? []),
                ...data.getRecursiveComments.results.map((comment) =>
                  toReference(comment),
                ),
              ];
            },
          },
        });
      }
    },
    [
      comments,
      movieId,
      rootParentId,
      fetchMore,
      isLoadingMoreParentIds,
      maxCommentDepth,
      setRootParentId,
    ],
  );

  const handleNaviateToComment = useCallback(
    (commentId: string | null) => {
      setRootParentId?.(commentId);
    },
    [setRootParentId],
  );

  const fixedComments = useMemo(
    () => (rootComment ? [{ ...rootComment, comments }] : comments),
    [rootComment, comments],
  );
  const isSingleCommentThread = rootParentId !== null;

  return (
    <section
      ref={sectionRef}
      className={cn("flex flex-col", className)}
      {...props}
    >
      <h2 className="text-xl font-semibold dark:text-brand-12 mb-3 flex flex-row items-center gap-2">
        Comments
        {isSingleCommentThread && (
          <span className="text-brand-11 text-sm font-normal">
            (Single comment thread)
          </span>
        )}
      </h2>
      <div className="flex flex-col gap-4">
        {!isSingleCommentThread && !commentInputOpen && currentUser && (
          <Button
            className="w-fit"
            size="sm"
            onClick={() => setCommentInputOpen(true)}
            aria-label="Add comment"
          >
            Add a comment
          </Button>
        )}

        {currentUser && (
          <AddComment
            className="mb-4"
            currentUser={currentUser}
            movieId={movieId}
            isOpen={commentInputOpen}
            onClose={() => setCommentInputOpen(false)}
          />
        )}

        <div className="">
          {isSingleCommentThread && (
            <button
              type="button"
              className="text-sm w-fit text-blue-11 whitespace-nowrap hover:text-blue-10"
              onClick={() => handleNaviateToComment(null)}
            >
              See full discussion
            </button>
          )}
          <Separator orientation="horizontal" />
        </div>

        <ParentIdContext.Provider value={rootParentId}>
          {loading && <Spinner />}
          {!loading && fixedComments.length === 0 && (
            <p className="dark:text-brand-11 text-purple-text">
              {isSingleCommentThread ? "Comment not found" : "No comments yet"}
            </p>
          )}
          <CommentsContainer
            parentId={rootParentId}
            rootParentId={rootParentId}
            totalComments={totalResults}
            comments={fixedComments}
            maxDepth={maxCommentDepth}
            isLoadingMoreParentIds={isLoadingMoreParentIds}
            onMoreCommentsClick={handleMoreCommentsClick}
            onNavigateToComment={handleNaviateToComment}
          />
        </ParentIdContext.Provider>
      </div>
    </section>
  );
};
