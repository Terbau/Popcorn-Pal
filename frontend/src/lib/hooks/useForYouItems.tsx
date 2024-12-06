import { type QueryHookOptions, useQuery } from "@apollo/client";
import type {
  GetForYouItemsQuery,
  GetForYouItemsQueryVariables,
} from "../graphql/generated/graphql";
import { GET_FOR_YOU_ITEMS } from "../graphql/queries/foryou";

interface UseForYouItemsParams {
  seed: number;
  page?: number;
}

export const useForYouItems = (
  { seed, page }: UseForYouItemsParams,
  options?: QueryHookOptions<GetForYouItemsQuery, GetForYouItemsQueryVariables>,
) => {
  const { data, ...rest } = useQuery(GET_FOR_YOU_ITEMS, {
    variables: { seed, page, ...options?.variables },
    ...options,
  });

  return {
    results: data?.getForYouItems.results ?? [],
    maybeHasMore: data?.getForYouItems.maybeHasMore ?? false,
    ...rest,
  };
};
