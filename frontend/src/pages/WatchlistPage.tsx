import {
  FilterableMovieList,
  FilterableMovieListContent,
  FilterableMovieListContentList,
  FilterableMovieListHeader,
  FilterableMovieListSidebar,
  ORDER_BY_OPTIONS,
  ORDER_DIRECTION_OPTIONS,
} from "@/components/organisms/FilterableMovieList";
import { parseAsInteger, parseAsStringLiteral, useQueryState } from "nuqs";
import { useMemo, useState } from "react";
import { useSessionStorageState } from "ahooks";
import { SkeletonDetailedMovieCard } from "@/components/molecules/DetailedMovieCard/SkeletonDetailedMovieCard";
import { DetailedMovieCard } from "@/components/molecules/DetailedMovieCard/DetailedMovieCard";
import { Link, useParams } from "react-router-dom";
import { GenreSidebarFilter } from "@/components/organisms/GenreSidebarFilter";
import { useWatchlistItems } from "@/lib/hooks/useWatchlistItems";
import { WatchlistItemLabelSidebarFilter } from "@/components/organisms/WatchlistItemLabel/WatchlistItemLabelSidebarFilter";
import { useUser } from "@/lib/hooks/useUser";
import { useAuth } from "@/lib/context/authContext";
import { Avatar } from "@/components/molecules/Avatar/Avatar";
import { createInitials } from "@/lib/utils/textUtils";
import { ConfirmModal } from "@/components/molecules/ConfirmModal/ConfirmModal";
import { useDeleteWatchlistItem } from "@/lib/hooks/useDeleteWatchlistItem";
import { toast } from "react-toastify";
import { Skeleton } from "@/components/atoms/Skeleton/Skeleton";
import { watchlistItemLabels as originalWatchlistItemLabels } from "@/components/organisms/WatchlistItemLabel/WatchlistItemLabelSidebarFilter";

export default function WatchlistPage() {
  const { userId } = useParams();
  const { currentUser } = useAuth();

  const [confirmModalOpen, setConfirmModalOpen] = useState(false);
  const [watchlistMovieIdToDelete, setWatchlistMovieIdToDelete] = useState<
    string | undefined
  >(undefined);

  // Use query state to store the filter options. This is so that the filters can
  // easily be shared by copy-pasting the URL.
  const [orderBy, setOrderBy] = useQueryState(
    "orderBy",
    parseAsStringLiteral(ORDER_BY_OPTIONS).withDefault("externalRating"),
  );
  const [orderDirection, setOrderDirection] = useQueryState(
    "orderDirection",
    parseAsStringLiteral(ORDER_DIRECTION_OPTIONS).withDefault("desc"),
  );
  const [page, setPage] = useQueryState("page", parseAsInteger.withDefault(1));
  const [pageSize] = useQueryState("pageSize", parseAsInteger.withDefault(20));

  // Store genres in session storage as they take up too much space in the URL
  const [possiblyUndefinedGenres, setGenres] = useSessionStorageState(
    "watchlistGenres",
    {
      defaultValue: [] as string[],
      listenStorageChange: true,
    },
  );
  // Ensure that genres is never undefined
  const genres = useMemo(
    () => possiblyUndefinedGenres ?? [],
    [possiblyUndefinedGenres],
  );

  // Store watchlist item labels in session storage as they take up too much space in the URL
  const [possiblyUndefinedWatchlistItemLabels, setWatchlistItemLabels] =
    useSessionStorageState("watchlistItemLabels", {
      defaultValue: originalWatchlistItemLabels.slice(),
      listenStorageChange: true,
    });
  // Ensure that watchlist item labels is never undefined
  const watchlistItemLabels = useMemo(
    () => possiblyUndefinedWatchlistItemLabels ?? [],
    [possiblyUndefinedWatchlistItemLabels],
  );

  // Only fetch the user if the user is not the current user, because why
  // refetch a user we already have the data for?
  const { user: apiUser } = useUser({
    variables: {
      id: userId ?? "",
    },
    skip: !userId || currentUser?.id === userId,
  });
  const user = currentUser?.id === userId ? currentUser : apiUser;

  const { watchlistItems, totalResults, loading } = useWatchlistItems(
    {
      userId: userId ?? "",
      orderBy,
      orderDirection,
      page: page - 1, // The API uses 0-based indexing
      pageSize,
      genres,
      labels: watchlistItemLabels,
    },
    {
      skip: !userId,
    },
  );

  const [deleteWatchlistItem] = useDeleteWatchlistItem(
    { userId: userId ?? "" },
    {
      onCompleted: () => {
        toast.success("Movie removed from watchlist");
      },
      onError: () => {
        toast.error("An error occurred while removing movie from watchlist");
      },
    },
  );

  // Handle confirm modal delete confirm button click
  const handleConfirmModalConfirm = () => {
    if (!watchlistMovieIdToDelete) return;

    deleteWatchlistItem({
      variables: {
        movieId: watchlistMovieIdToDelete,
      },
    });
  };

  const handleModalOpenChange = (open: boolean) => {
    if (open) return;

    setWatchlistMovieIdToDelete(undefined);
    setConfirmModalOpen(false);
  };

  const handleOnDeleteClick = (movieId: string) => {
    setWatchlistMovieIdToDelete(movieId);
    setConfirmModalOpen(true);
  };

  if (!userId) {
    return <p className="flex justify-center text-2xl mt-6">User not found</p>;
  }

  return (
    <>
      <ConfirmModal
        open={confirmModalOpen}
        onOpenChange={handleModalOpenChange}
        onConfirm={handleConfirmModalConfirm}
        onCancel={() => setWatchlistMovieIdToDelete(undefined)}
        description="Are you sure you want to remove this movie from your watchlist?"
      />
      <div className="max-w-screen-lg mx-auto w-[90vw]">
        <div className="mx-auto md:mx-0 mt-6 flex flex-row gap-4 rounded-lg p-1">
          {loading ? (
            <>
              <Skeleton className="w-8 md:w-12 h-8 md:h-12" />
              <Skeleton className="w-3/4 h-8 md:h-12" />
            </>
          ) : (
            <Link to={`/profile/${user?.id}`} className="flex flex-row gap-4">
              <Avatar
                src={user?.avatarUrl ?? undefined}
                fallback={createInitials(user?.firstName, user?.lastName)}
                size="lg"
              />
              <h1 className="font-bold dark:text-brand-12 text-3xl sm:text-5xl">
                {user?.firstName} {user?.lastName}'s watchlist
              </h1>
            </Link>
          )}
        </div>
        <FilterableMovieList
          totalResults={totalResults}
          orderBy={orderBy}
          onOrderByChange={setOrderBy}
          orderDirection={orderDirection}
          onOrderDirectionChange={setOrderDirection}
          pageSize={pageSize}
          page={page}
          onPageChange={setPage}
          isLoading={loading}
        >
          <FilterableMovieListSidebar>
            <WatchlistItemLabelSidebarFilter
              checkedWatchlistItemLabels={watchlistItemLabels}
              onCheckedWatchlistItemsLabelChange={setWatchlistItemLabels}
            />
            <GenreSidebarFilter genres={genres} onGenresChange={setGenres} />
          </FilterableMovieListSidebar>
          <FilterableMovieListContent>
            <FilterableMovieListHeader />
            <FilterableMovieListContentList>
              {loading ? (
                Array.from({ length: 3 }).map((_, i) => (
                  // biome-ignore lint/suspicious/noArrayIndexKey: <makes sense to use i here>
                  <SkeletonDetailedMovieCard key={i} />
                ))
              ) : watchlistItems.length > 0 ? (
                watchlistItems.map((watchlistItem) => (
                  <DetailedMovieCard
                    key={watchlistItem.movieId}
                    movie={watchlistItem.movie}
                    watchlistItem={watchlistItem}
                    href={`/movie/${watchlistItem.movieId}`}
                    hasDeleteButton
                    onDeleteClick={() =>
                      handleOnDeleteClick(watchlistItem.movieId)
                    }
                  />
                ))
              ) : (
                <p className="text-2xl mt-6 mx-auto md:ml-[20%]">
                  No movies found in watchlist
                </p>
              )}
            </FilterableMovieListContentList>
          </FilterableMovieListContent>
        </FilterableMovieList>
      </div>
    </>
  );
}
