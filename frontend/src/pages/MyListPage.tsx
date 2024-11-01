import { SelectGenre } from "../components/molecules/SelectGenre/SelectGenre";
// import { FavoriteMovies } from "../components/molecules/FavoriteMovies/FavoriteMovies";
import { SortSelect } from "../components/atoms/SortSelect/SortSelect";
import type { Query } from "../__generated__/types";
import { gql, useQuery } from "@apollo/client";
import { MovieDisplay } from "../components/molecules/MovieDisplay";

const GET_MOVIES = gql`
  query GetMovies {
    movies {
      id
      title
      genres
      posterUrl
      description
      rating
    }
  }
`;

export default function MyListPage() {
  const { data, loading, error } = useQuery<Pick<Query, "movies">>(GET_MOVIES);

  if (loading || !data) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div className="flex flex-wrap items-left w-full pt-6">
      <div className="w-1/4 h-full">
        <SelectGenre></SelectGenre>
      </div>
      <div className="w-8/12 h-24">
        <SortSelect
          onSortChange={(value: string) => {
            console.log(`Selected sort value: ${value}`);
          }}
        />
        {data.movies?.map((movie) => (
          <MovieDisplay movie={movie}></MovieDisplay>
        ))}

        <p className="text-2xl">Min Liste</p>
      </div>
    </div>
  );
}
