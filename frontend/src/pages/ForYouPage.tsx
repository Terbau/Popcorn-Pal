import { Button } from "@/components/atoms/Button/Button";
import { LoadingPageSpinner } from "@/components/atoms/Spinner/LoadingPageSpinner";
import { ForYouItem } from "@/components/molecules/ForYouItem/ForYouItem";
import { LoadingButton } from "@/components/molecules/LoadingButton/LoadingButton";
import { useAuth } from "@/lib/context/authContext";
import { GET_FOR_YOU_ITEMS } from "@/lib/graphql/queries/foryou";
import { useLazyQuery } from "@apollo/client";
import { useSessionStorageState } from "ahooks";
import { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function ForYouPage() {
  const { currentUser } = useAuth();

  // Seed is a number between 0 and 1
  const [seed] = useSessionStorageState("foryouSeed", {
    defaultValue: Math.random(),
  });
  const [page, setPage] = useState(0);
  const [isLoadingMore, setIsLoadingMore] = useState(false);

  const [fetchInitialItems, { data, loading, fetchMore }] = useLazyQuery(
    GET_FOR_YOU_ITEMS,
    {
      variables: {
        seed: seed ?? 0,
        page,
      },
    },
  );
  const results = data?.getForYouItems.results ?? [];
  const maybeHasMore = data?.getForYouItems.maybeHasMore ?? false;

  const fetchMoreItems = useCallback(
    async (page: number) => {
      setIsLoadingMore(true);
      try {
        await fetchMore({
          variables: {
            page,
          },
        });
      } finally {
        setIsLoadingMore(false);
      }
    },
    [fetchMore],
  );

  useEffect(() => {
    if (page === 0 && currentUser) {
      fetchInitialItems();
    }

    if (page > 0 && currentUser) {
      fetchMoreItems(page);
    }
  }, [page, fetchMoreItems, fetchInitialItems, currentUser]);

  return (
    <div className="max-w-screen-lg mx-auto w-[90vw]">
      <h1 className="font-bold dark:text-brand-12 text-4xl mt-8 mb-3">
        For You
      </h1>
      <p className="dark:text-brand-11 text-purple-medium mb-4">
        This page has results tailored just for you! Your feed gets increasingly
        interesting the more people you follow!
      </p>
      {loading && <LoadingPageSpinner />}
      {!currentUser ? (
        <Button asChild className="w-fit" aria-label="Sign into account">
          <Link to="/signin">Sign in</Link>
        </Button>
      ) : (
        <>
          <div className="flex flex-col gap-8 mt-12">
            {results.map((item, index) => (
              <ForYouItem key={`${item.type}-${index}`} item={item} />
            ))}
          </div>
          {!loading && maybeHasMore && (
            <div className="mx-auto mt-6 w-fit">
              <LoadingButton
                isLoading={isLoadingMore}
                onClick={() => setPage((prev) => prev + 1)}
              >
                Load more
              </LoadingButton>
            </div>
          )}
        </>
      )}
    </div>
  );
}
