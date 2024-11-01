import type { Session } from "./auth";
import type { Comment } from "./comment";
import type {
  Creator,
  Genre,
  Movie,
  MovieCreator,
  MovieGenre,
  MovieStar,
  Star,
} from "./movie";
import type { User } from "./user";

export interface Database {
  user: User;
  session: Session;
  genre: Genre;
  creator: Creator;
  star: Star;
  movieGenre: MovieGenre;
  movieCreator: MovieCreator;
  movieStar: MovieStar;
  movie: Movie;
  comment: Comment;
}
