import { type QueryHookOptions, useQuery } from "@apollo/client";
import { GET_MOVIE } from "../graphql/queries/movie";
import type {
  GetMovieQuery,
  GetMovieQueryVariables,
} from "../graphql/generated/graphql";

interface UseMovieParams {
  id: string;
}

export const useMovie = (
  { id }: UseMovieParams,
  options?: QueryHookOptions<GetMovieQuery, GetMovieQueryVariables>,
) => {
  const { data, ...rest } = useQuery(GET_MOVIE, {
    ...options,
    variables: {
      id,
      ...options?.variables,
    },
  });

  return {
    movie: data?.getMovie,
    ...rest,
  };
};
