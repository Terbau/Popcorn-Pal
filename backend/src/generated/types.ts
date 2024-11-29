import { GraphQLResolveInfo, GraphQLScalarType, GraphQLScalarTypeConfig } from 'graphql';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
export type RequireFields<T, K extends keyof T> = Omit<T, K> & { [P in K]-?: NonNullable<T[P]> };
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

export type Creator = {
  __typename?: 'Creator';
  id: Scalars['String']['output'];
  name: Scalars['String']['output'];
};

export type Genre = {
  __typename?: 'Genre';
  id: Scalars['String']['output'];
  name: Scalars['String']['output'];
};

export type Movie = {
  __typename?: 'Movie';
  certificate?: Maybe<Scalars['String']['output']>;
  createdAt?: Maybe<Scalars['Date']['output']>;
  creators: Array<Creator>;
  externalMovieMeterRank?: Maybe<Scalars['Int']['output']>;
  externalRating?: Maybe<Scalars['Float']['output']>;
  externalVotes?: Maybe<Scalars['Int']['output']>;
  genres: Array<Genre>;
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
  stars: Array<Star>;
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

export type PaginatedMoviesResult = {
  __typename?: 'PaginatedMoviesResult';
  nextPage?: Maybe<Scalars['Int']['output']>;
  results: Array<Movie>;
  totalResults?: Maybe<Scalars['Int']['output']>;
};

export type PaginatedSearchResult = {
  __typename?: 'PaginatedSearchResult';
  nextPage?: Maybe<Scalars['Int']['output']>;
  results: Array<SearchMovie>;
  totalResults?: Maybe<Scalars['Int']['output']>;
};

export type Query = {
  __typename?: 'Query';
  getFeaturedMovies: Array<Movie>;
  getGenres: Array<Genre>;
  getMovie?: Maybe<Movie>;
  getMovies: PaginatedMoviesResult;
  getUser?: Maybe<User>;
  randomMovie: Movie;
  searchMovies: PaginatedSearchResult;
};


export type QueryGetMovieArgs = {
  id: Scalars['ID']['input'];
};


export type QueryGetMoviesArgs = {
  genres?: InputMaybe<Array<Scalars['String']['input']>>;
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

export type Star = {
  __typename?: 'Star';
  id: Scalars['String']['output'];
  name: Scalars['String']['output'];
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

export type WithIndex<TObject> = TObject & Record<string, any>;
export type ResolversObject<TObject> = WithIndex<TObject>;

export type ResolverTypeWrapper<T> = Promise<T> | T;


export type ResolverWithResolve<TResult, TParent, TContext, TArgs> = {
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> = ResolverFn<TResult, TParent, TContext, TArgs> | ResolverWithResolve<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterable<TResult> | Promise<AsyncIterable<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (obj: T, context: TContext, info: GraphQLResolveInfo) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;



/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = ResolversObject<{
  Boolean: ResolverTypeWrapper<Scalars['Boolean']['output']>;
  Comment: ResolverTypeWrapper<Comment>;
  Creator: ResolverTypeWrapper<Creator>;
  Date: ResolverTypeWrapper<Scalars['Date']['output']>;
  Float: ResolverTypeWrapper<Scalars['Float']['output']>;
  Genre: ResolverTypeWrapper<Genre>;
  ID: ResolverTypeWrapper<Scalars['ID']['output']>;
  Int: ResolverTypeWrapper<Scalars['Int']['output']>;
  Movie: ResolverTypeWrapper<Movie>;
  Mutation: ResolverTypeWrapper<{}>;
  PaginatedMoviesResult: ResolverTypeWrapper<PaginatedMoviesResult>;
  PaginatedSearchResult: ResolverTypeWrapper<PaginatedSearchResult>;
  Query: ResolverTypeWrapper<{}>;
  SearchMovie: ResolverTypeWrapper<SearchMovie>;
  SignInInput: SignInInput;
  SignUpInput: SignUpInput;
  Star: ResolverTypeWrapper<Star>;
  String: ResolverTypeWrapper<Scalars['String']['output']>;
  UpdateUserInput: UpdateUserInput;
  Upload: ResolverTypeWrapper<Scalars['Upload']['output']>;
  User: ResolverTypeWrapper<User>;
}>;

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = ResolversObject<{
  Boolean: Scalars['Boolean']['output'];
  Comment: Comment;
  Creator: Creator;
  Date: Scalars['Date']['output'];
  Float: Scalars['Float']['output'];
  Genre: Genre;
  ID: Scalars['ID']['output'];
  Int: Scalars['Int']['output'];
  Movie: Movie;
  Mutation: {};
  PaginatedMoviesResult: PaginatedMoviesResult;
  PaginatedSearchResult: PaginatedSearchResult;
  Query: {};
  SearchMovie: SearchMovie;
  SignInInput: SignInInput;
  SignUpInput: SignUpInput;
  Star: Star;
  String: Scalars['String']['output'];
  UpdateUserInput: UpdateUserInput;
  Upload: Scalars['Upload']['output'];
  User: User;
}>;

export type CommentResolvers<ContextType = any, ParentType extends ResolversParentTypes['Comment'] = ResolversParentTypes['Comment']> = ResolversObject<{
  content?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  createdAt?: Resolver<Maybe<ResolversTypes['Date']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  movieId?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  updatedAt?: Resolver<Maybe<ResolversTypes['Date']>, ParentType, ContextType>;
  userId?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type CreatorResolvers<ContextType = any, ParentType extends ResolversParentTypes['Creator'] = ResolversParentTypes['Creator']> = ResolversObject<{
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export interface DateScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['Date'], any> {
  name: 'Date';
}

export type GenreResolvers<ContextType = any, ParentType extends ResolversParentTypes['Genre'] = ResolversParentTypes['Genre']> = ResolversObject<{
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type MovieResolvers<ContextType = any, ParentType extends ResolversParentTypes['Movie'] = ResolversParentTypes['Movie']> = ResolversObject<{
  certificate?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  createdAt?: Resolver<Maybe<ResolversTypes['Date']>, ParentType, ContextType>;
  creators?: Resolver<Array<ResolversTypes['Creator']>, ParentType, ContextType>;
  externalMovieMeterRank?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  externalRating?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  externalVotes?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  genres?: Resolver<Array<ResolversTypes['Genre']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  landscapePosterHeight?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  landscapePosterUrl?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  landscapePosterWidth?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  plot?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  posterHeight?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  posterUrl?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  posterWidth?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  releasedAt?: Resolver<Maybe<ResolversTypes['Date']>, ParentType, ContextType>;
  runtime?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  showcaseOnHomePage?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  stars?: Resolver<Array<ResolversTypes['Star']>, ParentType, ContextType>;
  title?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  updatedAt?: Resolver<Maybe<ResolversTypes['Date']>, ParentType, ContextType>;
  yearReleased?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type MutationResolvers<ContextType = any, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = ResolversObject<{
  signIn?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType, RequireFields<MutationSignInArgs, 'input'>>;
  signOut?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  signUp?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType, RequireFields<MutationSignUpArgs, 'input'>>;
  updateUser?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType, RequireFields<MutationUpdateUserArgs, 'input'>>;
}>;

export type PaginatedMoviesResultResolvers<ContextType = any, ParentType extends ResolversParentTypes['PaginatedMoviesResult'] = ResolversParentTypes['PaginatedMoviesResult']> = ResolversObject<{
  nextPage?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  results?: Resolver<Array<ResolversTypes['Movie']>, ParentType, ContextType>;
  totalResults?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type PaginatedSearchResultResolvers<ContextType = any, ParentType extends ResolversParentTypes['PaginatedSearchResult'] = ResolversParentTypes['PaginatedSearchResult']> = ResolversObject<{
  nextPage?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  results?: Resolver<Array<ResolversTypes['SearchMovie']>, ParentType, ContextType>;
  totalResults?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type QueryResolvers<ContextType = any, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = ResolversObject<{
  getFeaturedMovies?: Resolver<Array<ResolversTypes['Movie']>, ParentType, ContextType>;
  getGenres?: Resolver<Array<ResolversTypes['Genre']>, ParentType, ContextType>;
  getMovie?: Resolver<Maybe<ResolversTypes['Movie']>, ParentType, ContextType, RequireFields<QueryGetMovieArgs, 'id'>>;
  getMovies?: Resolver<ResolversTypes['PaginatedMoviesResult'], ParentType, ContextType, Partial<QueryGetMoviesArgs>>;
  getUser?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType, Partial<QueryGetUserArgs>>;
  randomMovie?: Resolver<ResolversTypes['Movie'], ParentType, ContextType>;
  searchMovies?: Resolver<ResolversTypes['PaginatedSearchResult'], ParentType, ContextType, RequireFields<QuerySearchMoviesArgs, 'query'>>;
}>;

export type SearchMovieResolvers<ContextType = any, ParentType extends ResolversParentTypes['SearchMovie'] = ResolversParentTypes['SearchMovie']> = ResolversObject<{
  externalRating?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  posterHeight?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  posterUrl?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  posterWidth?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  similarity?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  title?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  yearReleased?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type StarResolvers<ContextType = any, ParentType extends ResolversParentTypes['Star'] = ResolversParentTypes['Star']> = ResolversObject<{
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export interface UploadScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['Upload'], any> {
  name: 'Upload';
}

export type UserResolvers<ContextType = any, ParentType extends ResolversParentTypes['User'] = ResolversParentTypes['User']> = ResolversObject<{
  avatarUrl?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  createdAt?: Resolver<Maybe<ResolversTypes['Date']>, ParentType, ContextType>;
  email?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  firstName?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  lastName?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  updatedAt?: Resolver<Maybe<ResolversTypes['Date']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type Resolvers<ContextType = any> = ResolversObject<{
  Comment?: CommentResolvers<ContextType>;
  Creator?: CreatorResolvers<ContextType>;
  Date?: GraphQLScalarType;
  Genre?: GenreResolvers<ContextType>;
  Movie?: MovieResolvers<ContextType>;
  Mutation?: MutationResolvers<ContextType>;
  PaginatedMoviesResult?: PaginatedMoviesResultResolvers<ContextType>;
  PaginatedSearchResult?: PaginatedSearchResultResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  SearchMovie?: SearchMovieResolvers<ContextType>;
  Star?: StarResolvers<ContextType>;
  Upload?: GraphQLScalarType;
  User?: UserResolvers<ContextType>;
}>;

