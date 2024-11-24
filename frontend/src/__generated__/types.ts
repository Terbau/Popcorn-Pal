export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  Date: { input: Date; output: Date; }
  Upload: { input: any; output: any; }
};

export type Comment = {
  __typename?: 'Comment';
  content: Scalars['String']['output'];
  createdAt?: Maybe<Scalars['Date']['output']>;
  id: Scalars['ID']['output'];
  movieId: Scalars['ID']['output'];
  updatedAt?: Maybe<Scalars['Date']['output']>;
  userId: Scalars['ID']['output'];
};

export type Movie = {
  __typename?: 'Movie';
  certificate?: Maybe<Scalars['String']['output']>;
  createdAt?: Maybe<Scalars['Date']['output']>;
  creators?: Maybe<Array<Scalars['String']['output']>>;
  externalMovieMeterRank?: Maybe<Scalars['Int']['output']>;
  externalRating?: Maybe<Scalars['Float']['output']>;
  externalVotes?: Maybe<Scalars['Int']['output']>;
  genres?: Maybe<Array<Scalars['String']['output']>>;
  id: Scalars['ID']['output'];
  landscapePosterHeight?: Maybe<Scalars['Int']['output']>;
  landscapePosterUrl?: Maybe<Scalars['String']['output']>;
  landscapePosterWidth?: Maybe<Scalars['Int']['output']>;
  plot?: Maybe<Scalars['String']['output']>;
  posterHeight?: Maybe<Scalars['Int']['output']>;
  posterUrl?: Maybe<Scalars['String']['output']>;
  posterWidth?: Maybe<Scalars['Int']['output']>;
  releasedAt?: Maybe<Scalars['Date']['output']>;
  runtime?: Maybe<Scalars['Int']['output']>;
  showcaseOnHomePage?: Maybe<Scalars['Boolean']['output']>;
  stars?: Maybe<Array<Scalars['String']['output']>>;
  title: Scalars['String']['output'];
  updatedAt?: Maybe<Scalars['Date']['output']>;
  yearReleased?: Maybe<Scalars['Int']['output']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  signIn?: Maybe<User>;
  signOut: Scalars['Boolean']['output'];
  signUp?: Maybe<User>;
  updateUser?: Maybe<User>;
};


export type MutationSignInArgs = {
  input: SignInInput;
};


export type MutationSignUpArgs = {
  input: SignUpInput;
};


export type MutationUpdateUserArgs = {
  input: UpdateUserInput;
};

export type Query = {
  __typename?: 'Query';
  getFeaturedMovies?: Maybe<Array<Movie>>;
  getMovie?: Maybe<Movie>;
  getMovies?: Maybe<Array<Movie>>;
  getUser?: Maybe<User>;
  randomMovie: Movie;
  searchMovies?: Maybe<SearchResult>;
};


export type QueryGetMovieArgs = {
  id: Scalars['ID']['input'];
};


export type QueryGetMoviesArgs = {
  orderBy?: InputMaybe<Scalars['String']['input']>;
  orderDirection?: InputMaybe<Scalars['String']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  pageSize?: InputMaybe<Scalars['Int']['input']>;
};


export type QueryGetUserArgs = {
  id?: InputMaybe<Scalars['ID']['input']>;
};


export type QuerySearchMoviesArgs = {
  page?: InputMaybe<Scalars['Int']['input']>;
  pageSize?: InputMaybe<Scalars['Int']['input']>;
  query: Scalars['String']['input'];
};

export type SearchMovie = {
  __typename?: 'SearchMovie';
  externalRating?: Maybe<Scalars['Float']['output']>;
  id: Scalars['ID']['output'];
  posterHeight?: Maybe<Scalars['Int']['output']>;
  posterUrl?: Maybe<Scalars['String']['output']>;
  posterWidth?: Maybe<Scalars['Int']['output']>;
  similarity?: Maybe<Scalars['Float']['output']>;
  title: Scalars['String']['output'];
  yearReleased?: Maybe<Scalars['Int']['output']>;
};

export type SearchResult = {
  __typename?: 'SearchResult';
  movies?: Maybe<Array<SearchMovie>>;
  nextPage?: Maybe<Scalars['Int']['output']>;
  totalResults?: Maybe<Scalars['Int']['output']>;
};

export type SignInInput = {
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
};

export type SignUpInput = {
  email: Scalars['String']['input'];
  firstName: Scalars['String']['input'];
  lastName: Scalars['String']['input'];
  password: Scalars['String']['input'];
};

export type UpdateUserInput = {
  avatarFile?: InputMaybe<Scalars['Upload']['input']>;
  email?: InputMaybe<Scalars['String']['input']>;
  firstName?: InputMaybe<Scalars['String']['input']>;
  lastName?: InputMaybe<Scalars['String']['input']>;
};

export type User = {
  __typename?: 'User';
  avatarUrl?: Maybe<Scalars['String']['output']>;
  createdAt?: Maybe<Scalars['Date']['output']>;
  email?: Maybe<Scalars['String']['output']>;
  firstName?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  lastName?: Maybe<Scalars['String']['output']>;
  updatedAt?: Maybe<Scalars['Date']['output']>;
};
