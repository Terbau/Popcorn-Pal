import { Icon } from "@iconify/react/dist/iconify.js";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { gql, useQuery } from "@apollo/client";
import type { Query } from "../__generated__/types";

const GET_MOVIE = gql`
  query GetMovie($id: Int!) {
    movie(id: $id) {
      id
      title
      rating
      director
      runtime
      genres
      cast
      description
      posterUrl
      comments {
        id
        user
        content
        date
      }
    }
  }
`;

export default function MoviePage() {
  const { movieId } = useParams();
  const [liked, setLiked] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const parsedMovieId = Number.parseInt(movieId ?? "");

  const { data, loading, error } = useQuery<Pick<Query, "movie">>(GET_MOVIE, {
    variables: { id: parsedMovieId },
    skip: !parsedMovieId,
  });

  if (Number.isNaN(parsedMovieId)) return <p>Not found</p>;

  if (loading || !data) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const movie = data.movie;
  if (!movie) return <p>Not found</p>;

  const items = [
    { label: "Director", text: movie.director },
    { label: "Runtime", text: movie.runtime },
    { label: "Genres", text: movie.genres?.join(", ") },
    { label: "Cast", text: movie.cast?.join(", ") },
  ];

  const toggleLike = () => {
    setLiked(!liked);
  };

  return (
    <div className="container mx-auto p-4 mt-6 text-white">
      {/* Movie Title and Rating */}
      <section className="flex justify-between items-center">
        <h1 className="text-5xl font-medium">{movie.title}</h1>
        <div className="flex flex-row justify-between gap-10 items-center">
          <div className=" flex items-center justify-center gap-2">
            <Icon icon="pajamas:star" className="text-yellowdark-9 text-2xl" />
            <p className=" text-xl text-white">{movie.rating} / 10 Rating</p>
          </div>
          <button
            type="button"
            onClick={toggleLike}
            className=" flex items-center hover:bg-brand-4 hover:bg-opacity-20 cursor-pointer p-2 rounded-xl justify-center gap-2"
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
      <section className="flex flex-col md:flex-row mt-4">
        <div className="shrink-0">
          <img
            src={movie.posterUrl}
            alt={movie.title}
            className="rounded-lg shadow-lg shrink-0"
          />
        </div>

        <section>
          <aside className="w-1/3 shrink-0 bg-brand-3 h-fit rounded-xl max-w-60 float-right p-4 ml-4 mb-4 space-y-4 border border-brand-5">
            {items.map(({ label, text }) => (
              <p key={label} className="text-sm text-gray-500">
                <strong>{label}:</strong> {text}
              </p>
            ))}
          </aside>
          <h2 className="font-medium mt-2 md:pl-4 text-xl text-brand-11">
            Description
          </h2>
          <p className="mt-2 md:pl-4">{movie.description}</p>
        </section>
      </section>

      {/* Comment Section */}
      <section className="mt-8">
        <h2 className="text-2xl font-semibold mb-4 text-brand-11">Comments</h2>
        <ul>
          {movie.comments?.map((comment) => (
            <li
              key={comment.id}
              className="mb-4 p-4 bg-brand-3 rounded-lg border border-brand-6"
            >
              <p className="text-lg font-semibold">{comment.user}</p>
              <p className="text-gray-700">{comment.content}</p>
              <p className="text-sm text-gray-500">{comment.date}</p>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
