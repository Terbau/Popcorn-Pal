import type { Session } from "./auth";
import type { Comment, CommentVote } from "./comment";
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
import type { WatchlistItem } from "./watchlist";

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
  commentVote: CommentVote;
  watchlistItem: WatchlistItem;
}
