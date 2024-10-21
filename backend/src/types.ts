interface Comment {
  user: string;
  content: string;
  date: string;
  id: number;
}
export interface Movie {
  id: number;
  title: string;
  description: string;
  releaseDate: string;
  genres: string[];
  rating: number;
  director: string;
  cast: string[];
  runtime: string;
  posterUrl: string;
  comments: Comment[];
}
