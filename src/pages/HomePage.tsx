import { MainLayout } from "../components/layouts/MainLayout";
import { MovieCarousel } from "../components/molecules/MovieCarousel";
import SlideShow from "../components/molecules/SlideShow";

export default function HomePage() {
  // Mock movie data
  const mockMovies = [
    {
      id: 1,
      title: "Inception",
      posterUrl:
        "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_QL75_UX280_CR0,0,280,414_.jpg",
      URL: "/",
    },
    {
      id: 2,
      title: "The Dark Knight",
      posterUrl:
        "https://m.media-amazon.com/images/M/MV5BMTMxNTMwODM0NF5BMl5BanBnXkFtZTcwODAyMTk2Mw@@._V1_QL75_UX280_CR0,0,280,414_.jpg",
      URL: "/",
    },
    {
      id: 3,
      title: "Interstellar",
      posterUrl:
        "https://m.media-amazon.com/images/M/MV5BZjdkOTU3MDktN2IxOS00OGEyLWFmMjktY2FiMmZkNWIyODZiXkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_QL75_UX280_CR0,0,280,414_.jpg",
      URL: "/",
    },
    {
      id: 4,
      title: "The Matrix",
      posterUrl:
        "https://m.media-amazon.com/images/M/MV5BNzQzOTk3OTAtNDQ0Zi00ZTVkLWI0MTEtMDllZjNkYzNjNTc4L2ltYWdlXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_QL75_UX280_CR0,3,280,414_.jpg",
      URL: "/",
    },
    {
      id: 5,
      title: "Gladiator",
      posterUrl:
        "https://m.media-amazon.com/images/M/MV5BMDliMmNhNDEtODUyOS00MjNlLTgxODEtN2U3NzIxMGVkZTA1L2ltYWdlXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_QL75_UX280_CR0,0,280,414_.jpg",
      URL: "/",
    },
    {
      id: 6,
      title: "The Shawshank Redemption",
      posterUrl:
        "https://m.media-amazon.com/images/M/MV5BNDE3ODcxYzMtY2YzZC00NmNlLWJiNDMtZDViZWM2MzIxZDYwXkEyXkFqcGdeQXVyNjAwNDUxODI@._V1_QL75_UX280_CR0,3,280,414_.jpg",
      URL: "/",
    },
    {
      id: 7,
      title: "The Lord of the Rings",
      posterUrl:
        "https://m.media-amazon.com/images/M/MV5BNzA5ZDNlZWMtM2NhNS00NDJjLTk4NDItYTRmY2EwMWZlMTY3XkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_QL75_UX280_CR0,0,280,414_.jpg",
      URL: "/",
    },
    {
      id: 8,
      title: "Fight Club",
      posterUrl:
        "https://m.media-amazon.com/images/M/MV5BOTgyOGQ1NDItNGU3Ny00MjU3LTg2YWEtNmEyYjBiMjI1Y2M5XkEyXkFqcGc@._V1_QL75_UX280_CR0,3,280,414_.jpg",
      URL: "/",
    },
    {
      id: 9,
      title: "Forrest Gump",
      posterUrl:
        "https://m.media-amazon.com/images/M/MV5BNWIwODRlZTUtY2U3ZS00Yzg1LWJhNzYtMmZiYmEyNmU1NjMzXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_QL75_UY414_CR3,0,280,414_.jpg",
      URL: "/",
    },
    {
      id: 10,
      title: "Pulp Fiction",
      posterUrl:
        "https://m.media-amazon.com/images/M/MV5BNGNhMDIzZTUtNTBlZi00MTRlLWFjM2ItYzViMjE3YzI5MjljXkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_QL75_UY414_CR2,0,280,414_.jpg",
      URL: "/",
    },
  ];

  return (
    <MainLayout>
      <h1 className="text-white text-4xl font-semibold text-center">
        Home Page
      </h1>
      <SlideShow></SlideShow>
      <div className=" flex items-center justify-center h-screen">
        <MovieCarousel
          movieList={mockMovies}
          componentHeader="Topp 10 filmer"
        />
      </div>
    </MainLayout>
  );
}
