import { Icon } from "@iconify/react/dist/iconify.js";
import { MainLayout } from "../components/layouts/MainLayout";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { movies } from "../lib/mock";

export default function MoviePage() {
  const { movieId } = useParams();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (!movieId) return <p>Not found 1</p>;

  const parsedMovieId = Number.parseInt(movieId);
  if (isNaN(parsedMovieId)) return <p>Not found 2</p>;

  const movie = movies.find((movie) => movie.id === parsedMovieId);
  if (!movie) return <p>Not found 3</p>;

  const [liked, setLiked] = useState(false);

  const items = [
    { label: "Director", text: movie.director },
    { label: "Runtime", text: movie.runtime },
    { label: "genres", text: movie.genres.join(", ") },
    { label: "Cast", text: movie.cast.join(", ") },
  ];

  const toggleLike = () => {
    setLiked(!liked);
  };

  return (
    <MainLayout>
      <div className="container mx-auto p-4 text-white">
        {/* Movie Title and Rating */}
        <section className="flex justify-between items-center">
          <h1 className="text-5xl font-medium">{movie.title}</h1>
          <div className="flex flex-row justify-between gap-10 items-center">
            <div className=" flex items-center justify-center gap-2">
              <Icon
                icon="pajamas:star"
                className="text-yellowdark-9 text-2xl"
              />
              <p className=" text-xl text-white">{movie.rating} / 10 Rating</p>
            </div>
            <div
              onClick={toggleLike}
              className=" flex items-center hover:bg-brand-4 hover:bg-opacity-20 cursor-pointer p-2 rounded-xl justify-center gap-2"
            >
              <button className="text-red-9 text-3xl">
                {liked ? (
                  <Icon icon="weui:like-filled" />
                ) : (
                  <Icon icon="weui:like-outlined" />
                )}
              </button>
              <p className="text-xl">Favorite</p>
            </div>
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
            <aside className="w-1/3 shrink-0 bg-brand-3 h-fit rounded-xl max-w-60 float-right p-2 ml-4 mb-4 space-y-4">
              {items.map(({ label, text }) => (
                <p key={label} className="text-sm text-gray-500">
                  <strong>{label}:</strong> {text}
                </p>
              ))}
            </aside>
            <h2 className="font-medium mt-2 md:pl-4 text-2xl text-brand-11">
              Description:
            </h2>
            <p className="text-lg mt-2 md:pl-4">{movie.description}</p>
          </section>
        </section>

        {/* Comment Section */}
        <div className="mt-8">
          <h2 className="text-2xl font-semibold mb-4 text-brand-11">
            Comments
          </h2>
          {movie.comments.map((comment) => (
            <div key={comment.id} className="mb-4 p-4 bg-brand-4 rounded-lg">
              <p className="text-lg font-semibold">{comment.user}</p>
              <p className="text-gray-700">{comment.content}</p>
              <p className="text-sm text-gray-500">{comment.date}</p>
            </div>
          ))}
        </div>
      </div>
    </MainLayout>
  );
}
