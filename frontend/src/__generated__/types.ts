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
};

export type Comment = {
  __typename?: 'Comment';
  content?: Maybe<Scalars['String']['output']>;
  date?: Maybe<Scalars['String']['output']>;
  id: Scalars['Int']['output'];
  user?: Maybe<Scalars['String']['output']>;
};

export type Movie = {
  __typename?: 'Movie';
  cast?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  comments?: Maybe<Array<Comment>>;
  description?: Maybe<Scalars['String']['output']>;
  director?: Maybe<Scalars['String']['output']>;
  genres?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  id: Scalars['Int']['output'];
  posterUrl: Scalars['String']['output'];
  rating?: Maybe<Scalars['Float']['output']>;
  releaseDate?: Maybe<Scalars['String']['output']>;
  runtime?: Maybe<Scalars['String']['output']>;
  title: Scalars['String']['output'];
};

export type Mutation = {
  __typename?: 'Mutation';
  signIn?: Maybe<User>;
  signOut: Scalars['Boolean']['output'];
  signUp?: Maybe<User>;
};


export type MutationSignInArgs = {
  input: SignInInput;
};


export type MutationSignUpArgs = {
  input: SignUpInput;
};

export type Query = {
  __typename?: 'Query';
  getUser?: Maybe<User>;
  movie?: Maybe<Movie>;
  movies?: Maybe<Array<Movie>>;
};


export type QueryGetUserArgs = {
  id?: InputMaybe<Scalars['String']['input']>;
};


export type QueryMovieArgs = {
  id: Scalars['Int']['input'];
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

export type User = {
  __typename?: 'User';
  createdAt?: Maybe<Scalars['String']['output']>;
  email?: Maybe<Scalars['String']['output']>;
  firstName?: Maybe<Scalars['String']['output']>;
  id: Scalars['String']['output'];
  lastName?: Maybe<Scalars['String']['output']>;
  updatedAt?: Maybe<Scalars['String']['output']>;
};
