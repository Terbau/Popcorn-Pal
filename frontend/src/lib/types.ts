interface Comment {
  user: string;
  comment: string;
  date: string;
  id: number;
}
export interface Movie {
  id: number;
  title: string;
  description: string;
  releaseDate: string;
  genre: string[];
  rating: number;
  director: string;
  cast: string[];
  runtime: string;
  posterUrl: string;
  comments: Comment[];
}