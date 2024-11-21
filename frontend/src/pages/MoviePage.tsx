import { Icon } from "@iconify/react/dist/iconify.js";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { gql, useQuery } from "@apollo/client";
import type { Query } from "../__generated__/types";

const GET_MOVIE = gql`
  query GetMovie($id: ID!) {
    getMovie(id: $id) {
      id
      title
      plot
      runtime
      creators
      genres
      stars
      posterUrl
      posterHeight
      posterWidth
      externalRating
    }
  }
`;

export default function MoviePage() {
  const { movieId } = useParams();
  const [liked, setLiked] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const { data, loading, error } = useQuery<Pick<Query, "getMovie">>(
    GET_MOVIE,
    {
      variables: { id: movieId },
      skip: !movieId,
    },
  );

  if (loading || !data) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const movie = data.getMovie;
  if (!movie) return <p>Not found</p>;

  const items = [
    { label: "Director", text: movie.creators?.join(", ") },
    { label: "Runtime", text: movie.runtime },
    { label: "Genres", text: movie.genres?.join(", ") },
    { label: "Cast", text: movie.stars?.join(", ") },
  ];

  const toggleLike = () => {
    setLiked(!liked);
  };

  return (
    <div className="container mx-auto p-4 mt-6 text-white">
      {/* Movie Title and Rating */}
      <section
        className="flex justify-between items-center"
        data-cy="movie-header"
      >
        <h1 className="text-5xl font-medium" data-cy="movie-title">
          {movie.title}
        </h1>
        <div
          className="flex flex-row justify-between gap-10 items-center"
          data-cy="movie-rating-and-favorite"
        >
          <div
            className="flex items-center justify-center gap-2"
            data-cy="movie-rating"
          >
            <Icon icon="pajamas:star" className="text-yellowdark-9 text-2xl" />
            <p className="text-xl text-white">
              {movie.externalRating} / 10 Rating
            </p>
          </div>
          <button
            type="button"
            onClick={toggleLike}
            className="flex items-center hover:bg-brand-4 hover:bg-opacity-20 cursor-pointer p-2 rounded-xl justify-center gap-2"
            data-cy="favorite-button"
          >
            <span className="text-red-9 text-3xl">
              {liked ? (
                <Icon icon="weui:like-filled" />
              ) : (
                <Icon icon="weui:like-outlined" />
              )}
            </span>
            <p className="text-xl">Favorite</p>
          </button>
        </div>
      </section>

      {/* Movie Poster and Description */}
      <section className="flex flex-col md:flex-row mt-4" data-cy="movie-details">
        <div
          className="shrink-0 h-96 aspect-[2/3] rounded-lg overflow-hidden shadow-lg"
          data-cy="movie-poster"
        >
          <img
            src={movie.posterUrl ?? ""}
            alt={movie.title}
            className="h-full object-cover"
          />
        </div>

        <section>
          <aside
            className="w-1/3 shrink-0 bg-brand-3 h-fit rounded-xl max-w-60 float-right p-4 ml-4 mb-4 space-y-4 border border-brand-5"
            data-cy="movie-metadata"
          >
            {items.map(({ label, text }) => (
              <p key={label} className="text-sm text-gray-500" data-cy={`metadata-${label}`}>
                <strong>{label}:</strong> {text}
              </p>
            ))}
          </aside>
          <h2 className="font-medium mt-2 md:pl-4 text-xl text-brand-11" data-cy="description-title">
        Description
          </h2>
          <p className="mt-2 md:pl-4" data-cy="movie-description">
            {movie.plot}
          </p>
        </section>
      </section>
    </div>

  );
}
