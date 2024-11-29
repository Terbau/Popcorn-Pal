import { type QueryHookOptions, useQuery } from "@apollo/client";
import type {
  GetGenresQuery,
  GetGenresQueryVariables,
} from "../graphql/generated/graphql";
import { GET_GENRES } from "../graphql/queries/genre";

export const useGenres = (
  options?: QueryHookOptions<GetGenresQuery, GetGenresQueryVariables>,
) => {
  const { data, ...rest } = useQuery(GET_GENRES, options);

  return {
    genres: data?.getGenres ?? [],
    ...rest,
  };
};
