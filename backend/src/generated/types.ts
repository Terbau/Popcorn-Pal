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
  DateTime: { input: any; output: any; }
  Upload: { input: any; output: any; }
};

export type Comment = {
  __typename?: 'Comment';
  content: Scalars['String']['output'];
  createdAt: Scalars['DateTime']['output'];
  deletedAt?: Maybe<Scalars['DateTime']['output']>;
  id: Scalars['ID']['output'];
  movieId: Scalars['ID']['output'];
  parentId?: Maybe<Scalars['ID']['output']>;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
  userId?: Maybe<Scalars['ID']['output']>;
};

export type CommentVote = {
  __typename?: 'CommentVote';
  commentId: Scalars['ID']['output'];
  createdAt: Scalars['DateTime']['output'];
  type: Scalars['String']['output'];
  updatedAt: Scalars['DateTime']['output'];
  userId: Scalars['ID']['output'];
};

export type CreateCommentInput = {
  content: Scalars['String']['input'];
  movieId: Scalars['ID']['input'];
  parentId?: InputMaybe<Scalars['ID']['input']>;
};

export type CreateWatchlistItemInput = {
  label: Scalars['String']['input'];
  movieId: Scalars['ID']['input'];
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
  createdAt?: Maybe<Scalars['DateTime']['output']>;
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
  releasedAt?: Maybe<Scalars['DateTime']['output']>;
  runtime?: Maybe<Scalars['Int']['output']>;
  showcaseOnHomePage?: Maybe<Scalars['Boolean']['output']>;
  stars: Array<Star>;
  title: Scalars['String']['output'];
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
  yearReleased?: Maybe<Scalars['Int']['output']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  createComment: Comment;
  createWatchlistItem: WatchlistItem;
  deleteComment: Comment;
  deleteCommentVote: Scalars['Boolean']['output'];
  deleteWatchlistItem: Scalars['Boolean']['output'];
  signIn?: Maybe<User>;
  signOut: Scalars['Boolean']['output'];
  signUp?: Maybe<User>;
  updateComment: Comment;
  updateUser?: Maybe<User>;
  updateWatchlistItem: WatchlistItem;
  upsertCommentVote: CommentVote;
};


export type MutationCreateCommentArgs = {
  input: CreateCommentInput;
};


export type MutationCreateWatchlistItemArgs = {
  input: CreateWatchlistItemInput;
};


export type MutationDeleteCommentArgs = {
  id: Scalars['ID']['input'];
};


export type MutationDeleteCommentVoteArgs = {
  commentId: Scalars['ID']['input'];
};


export type MutationDeleteWatchlistItemArgs = {
  movieId: Scalars['ID']['input'];
};


export type MutationSignInArgs = {
  input: SignInInput;
};


export type MutationSignUpArgs = {
  input: SignUpInput;
};


export type MutationUpdateCommentArgs = {
  id: Scalars['ID']['input'];
  input: UpdateCommentInput;
};


export type MutationUpdateUserArgs = {
  input: UpdateUserInput;
};


export type MutationUpdateWatchlistItemArgs = {
  input: UpdateWatchlistItemInput;
  movieId: Scalars['ID']['input'];
};


export type MutationUpsertCommentVoteArgs = {
  commentId: Scalars['ID']['input'];
  input: UpsertCommentVoteInput;
};

export type PaginatedMoviesResult = {
  __typename?: 'PaginatedMoviesResult';
  results: Array<Movie>;
  totalResults: Scalars['Int']['output'];
};

export type PaginatedRecursiveCommentsResult = {
  __typename?: 'PaginatedRecursiveCommentsResult';
  movieId: Scalars['ID']['output'];
  parentId?: Maybe<Scalars['ID']['output']>;
  results: Array<RecursiveComment>;
  totalResults: Scalars['Int']['output'];
};

export type PaginatedSearchResult = {
  __typename?: 'PaginatedSearchResult';
  results: Array<SearchMovie>;
  totalResults: Scalars['Int']['output'];
};

export type PaginatedWatchlistItemsResult = {
  __typename?: 'PaginatedWatchlistItemsResult';
  genres?: Maybe<Array<Scalars['String']['output']>>;
  labels?: Maybe<Array<Scalars['String']['output']>>;
  orderBy?: Maybe<Scalars['String']['output']>;
  orderDirection?: Maybe<Scalars['String']['output']>;
  results: Array<WatchlistItem>;
  totalResults: Scalars['Int']['output'];
  userId: Scalars['ID']['output'];
};

export type Query = {
  __typename?: 'Query';
  getComment?: Maybe<RecursiveComment>;
  getFeaturedMovies: Array<Movie>;
  getGenres: Array<Genre>;
  getMovie?: Maybe<Movie>;
  getMovies: PaginatedMoviesResult;
  getRecursiveComments: PaginatedRecursiveCommentsResult;
  getUser?: Maybe<User>;
  getWatchlistItem?: Maybe<WatchlistItem>;
  getWatchlistItems: PaginatedWatchlistItemsResult;
  randomMovie: Movie;
  searchMovies: PaginatedSearchResult;
};


export type QueryGetCommentArgs = {
  id?: InputMaybe<Scalars['ID']['input']>;
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


export type QueryGetRecursiveCommentsArgs = {
  limitAtDepth?: InputMaybe<Scalars['Int']['input']>;
  maxDepth?: InputMaybe<Scalars['Int']['input']>;
  movieId: Scalars['ID']['input'];
  orderDirection?: InputMaybe<Scalars['String']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  pageSize?: InputMaybe<Scalars['Int']['input']>;
  parentId?: InputMaybe<Scalars['ID']['input']>;
};


export type QueryGetUserArgs = {
  id?: InputMaybe<Scalars['ID']['input']>;
};


export type QueryGetWatchlistItemArgs = {
  movieId: Scalars['ID']['input'];
  userId: Scalars['ID']['input'];
};


export type QueryGetWatchlistItemsArgs = {
  genres?: InputMaybe<Array<Scalars['String']['input']>>;
  labels?: InputMaybe<Array<Scalars['String']['input']>>;
  orderBy?: InputMaybe<Scalars['String']['input']>;
  orderDirection?: InputMaybe<Scalars['String']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  pageSize?: InputMaybe<Scalars['Int']['input']>;
  userId: Scalars['ID']['input'];
};


export type QuerySearchMoviesArgs = {
  page?: InputMaybe<Scalars['Int']['input']>;
  pageSize?: InputMaybe<Scalars['Int']['input']>;
  query: Scalars['String']['input'];
};

export type RecursiveComment = {
  __typename?: 'RecursiveComment';
  content: Scalars['String']['output'];
  createdAt: Scalars['DateTime']['output'];
  deletedAt?: Maybe<Scalars['DateTime']['output']>;
  depth: Scalars['Int']['output'];
  hasDownvoted: Scalars['Boolean']['output'];
  hasUpvoted: Scalars['Boolean']['output'];
  id: Scalars['ID']['output'];
  movieId: Scalars['ID']['output'];
  parentId?: Maybe<Scalars['ID']['output']>;
  totalComments: Scalars['Int']['output'];
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
  user?: Maybe<User>;
  userId?: Maybe<Scalars['ID']['output']>;
  voteRatio: Scalars['Int']['output'];
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

export type UpdateCommentInput = {
  content: Scalars['String']['input'];
};

export type UpdateUserInput = {
  avatarFile?: InputMaybe<Scalars['Upload']['input']>;
  email?: InputMaybe<Scalars['String']['input']>;
  firstName?: InputMaybe<Scalars['String']['input']>;
  lastName?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateWatchlistItemInput = {
  label: Scalars['String']['input'];
};

export type UpsertCommentVoteInput = {
  type: Scalars['String']['input'];
};

export type User = {
  __typename?: 'User';
  avatarUrl?: Maybe<Scalars['String']['output']>;
  createdAt: Scalars['DateTime']['output'];
  email: Scalars['String']['output'];
  firstName: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  lastName: Scalars['String']['output'];
  updatedAt: Scalars['DateTime']['output'];
};

export type WatchlistItem = {
  __typename?: 'WatchlistItem';
  createdAt: Scalars['DateTime']['output'];
  label: Scalars['String']['output'];
  movie: Movie;
  movieId: Scalars['ID']['output'];
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
  userId: Scalars['ID']['output'];
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
  CommentVote: ResolverTypeWrapper<CommentVote>;
  CreateCommentInput: CreateCommentInput;
  CreateWatchlistItemInput: CreateWatchlistItemInput;
  Creator: ResolverTypeWrapper<Creator>;
  DateTime: ResolverTypeWrapper<Scalars['DateTime']['output']>;
  Float: ResolverTypeWrapper<Scalars['Float']['output']>;
  Genre: ResolverTypeWrapper<Genre>;
  ID: ResolverTypeWrapper<Scalars['ID']['output']>;
  Int: ResolverTypeWrapper<Scalars['Int']['output']>;
  Movie: ResolverTypeWrapper<Movie>;
  Mutation: ResolverTypeWrapper<{}>;
  PaginatedMoviesResult: ResolverTypeWrapper<PaginatedMoviesResult>;
  PaginatedRecursiveCommentsResult: ResolverTypeWrapper<PaginatedRecursiveCommentsResult>;
  PaginatedSearchResult: ResolverTypeWrapper<PaginatedSearchResult>;
  PaginatedWatchlistItemsResult: ResolverTypeWrapper<PaginatedWatchlistItemsResult>;
  Query: ResolverTypeWrapper<{}>;
  RecursiveComment: ResolverTypeWrapper<RecursiveComment>;
  SearchMovie: ResolverTypeWrapper<SearchMovie>;
  SignInInput: SignInInput;
  SignUpInput: SignUpInput;
  Star: ResolverTypeWrapper<Star>;
  String: ResolverTypeWrapper<Scalars['String']['output']>;
  UpdateCommentInput: UpdateCommentInput;
  UpdateUserInput: UpdateUserInput;
  UpdateWatchlistItemInput: UpdateWatchlistItemInput;
  Upload: ResolverTypeWrapper<Scalars['Upload']['output']>;
  UpsertCommentVoteInput: UpsertCommentVoteInput;
  User: ResolverTypeWrapper<User>;
  WatchlistItem: ResolverTypeWrapper<WatchlistItem>;
}>;

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = ResolversObject<{
  Boolean: Scalars['Boolean']['output'];
  Comment: Comment;
  CommentVote: CommentVote;
  CreateCommentInput: CreateCommentInput;
  CreateWatchlistItemInput: CreateWatchlistItemInput;
  Creator: Creator;
  DateTime: Scalars['DateTime']['output'];
  Float: Scalars['Float']['output'];
  Genre: Genre;
  ID: Scalars['ID']['output'];
  Int: Scalars['Int']['output'];
  Movie: Movie;
  Mutation: {};
  PaginatedMoviesResult: PaginatedMoviesResult;
  PaginatedRecursiveCommentsResult: PaginatedRecursiveCommentsResult;
  PaginatedSearchResult: PaginatedSearchResult;
  PaginatedWatchlistItemsResult: PaginatedWatchlistItemsResult;
  Query: {};
  RecursiveComment: RecursiveComment;
  SearchMovie: SearchMovie;
  SignInInput: SignInInput;
  SignUpInput: SignUpInput;
  Star: Star;
  String: Scalars['String']['output'];
  UpdateCommentInput: UpdateCommentInput;
  UpdateUserInput: UpdateUserInput;
  UpdateWatchlistItemInput: UpdateWatchlistItemInput;
  Upload: Scalars['Upload']['output'];
  UpsertCommentVoteInput: UpsertCommentVoteInput;
  User: User;
  WatchlistItem: WatchlistItem;
}>;

export type CommentResolvers<ContextType = any, ParentType extends ResolversParentTypes['Comment'] = ResolversParentTypes['Comment']> = ResolversObject<{
  content?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  deletedAt?: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  movieId?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  parentId?: Resolver<Maybe<ResolversTypes['ID']>, ParentType, ContextType>;
  updatedAt?: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>;
  userId?: Resolver<Maybe<ResolversTypes['ID']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type CommentVoteResolvers<ContextType = any, ParentType extends ResolversParentTypes['CommentVote'] = ResolversParentTypes['CommentVote']> = ResolversObject<{
  commentId?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  type?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  updatedAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  userId?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type CreatorResolvers<ContextType = any, ParentType extends ResolversParentTypes['Creator'] = ResolversParentTypes['Creator']> = ResolversObject<{
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export interface DateTimeScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['DateTime'], any> {
  name: 'DateTime';
}

export type GenreResolvers<ContextType = any, ParentType extends ResolversParentTypes['Genre'] = ResolversParentTypes['Genre']> = ResolversObject<{
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type MovieResolvers<ContextType = any, ParentType extends ResolversParentTypes['Movie'] = ResolversParentTypes['Movie']> = ResolversObject<{
  certificate?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  createdAt?: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>;
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
  releasedAt?: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>;
  runtime?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  showcaseOnHomePage?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  stars?: Resolver<Array<ResolversTypes['Star']>, ParentType, ContextType>;
  title?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  updatedAt?: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>;
  yearReleased?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type MutationResolvers<ContextType = any, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = ResolversObject<{
  createComment?: Resolver<ResolversTypes['Comment'], ParentType, ContextType, RequireFields<MutationCreateCommentArgs, 'input'>>;
  createWatchlistItem?: Resolver<ResolversTypes['WatchlistItem'], ParentType, ContextType, RequireFields<MutationCreateWatchlistItemArgs, 'input'>>;
  deleteComment?: Resolver<ResolversTypes['Comment'], ParentType, ContextType, RequireFields<MutationDeleteCommentArgs, 'id'>>;
  deleteCommentVote?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType, RequireFields<MutationDeleteCommentVoteArgs, 'commentId'>>;
  deleteWatchlistItem?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType, RequireFields<MutationDeleteWatchlistItemArgs, 'movieId'>>;
  signIn?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType, RequireFields<MutationSignInArgs, 'input'>>;
  signOut?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  signUp?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType, RequireFields<MutationSignUpArgs, 'input'>>;
  updateComment?: Resolver<ResolversTypes['Comment'], ParentType, ContextType, RequireFields<MutationUpdateCommentArgs, 'id' | 'input'>>;
  updateUser?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType, RequireFields<MutationUpdateUserArgs, 'input'>>;
  updateWatchlistItem?: Resolver<ResolversTypes['WatchlistItem'], ParentType, ContextType, RequireFields<MutationUpdateWatchlistItemArgs, 'input' | 'movieId'>>;
  upsertCommentVote?: Resolver<ResolversTypes['CommentVote'], ParentType, ContextType, RequireFields<MutationUpsertCommentVoteArgs, 'commentId' | 'input'>>;
}>;

export type PaginatedMoviesResultResolvers<ContextType = any, ParentType extends ResolversParentTypes['PaginatedMoviesResult'] = ResolversParentTypes['PaginatedMoviesResult']> = ResolversObject<{
  results?: Resolver<Array<ResolversTypes['Movie']>, ParentType, ContextType>;
  totalResults?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type PaginatedRecursiveCommentsResultResolvers<ContextType = any, ParentType extends ResolversParentTypes['PaginatedRecursiveCommentsResult'] = ResolversParentTypes['PaginatedRecursiveCommentsResult']> = ResolversObject<{
  movieId?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  parentId?: Resolver<Maybe<ResolversTypes['ID']>, ParentType, ContextType>;
  results?: Resolver<Array<ResolversTypes['RecursiveComment']>, ParentType, ContextType>;
  totalResults?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type PaginatedSearchResultResolvers<ContextType = any, ParentType extends ResolversParentTypes['PaginatedSearchResult'] = ResolversParentTypes['PaginatedSearchResult']> = ResolversObject<{
  results?: Resolver<Array<ResolversTypes['SearchMovie']>, ParentType, ContextType>;
  totalResults?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type PaginatedWatchlistItemsResultResolvers<ContextType = any, ParentType extends ResolversParentTypes['PaginatedWatchlistItemsResult'] = ResolversParentTypes['PaginatedWatchlistItemsResult']> = ResolversObject<{
  genres?: Resolver<Maybe<Array<ResolversTypes['String']>>, ParentType, ContextType>;
  labels?: Resolver<Maybe<Array<ResolversTypes['String']>>, ParentType, ContextType>;
  orderBy?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  orderDirection?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  results?: Resolver<Array<ResolversTypes['WatchlistItem']>, ParentType, ContextType>;
  totalResults?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  userId?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type QueryResolvers<ContextType = any, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = ResolversObject<{
  getComment?: Resolver<Maybe<ResolversTypes['RecursiveComment']>, ParentType, ContextType, Partial<QueryGetCommentArgs>>;
  getFeaturedMovies?: Resolver<Array<ResolversTypes['Movie']>, ParentType, ContextType>;
  getGenres?: Resolver<Array<ResolversTypes['Genre']>, ParentType, ContextType>;
  getMovie?: Resolver<Maybe<ResolversTypes['Movie']>, ParentType, ContextType, RequireFields<QueryGetMovieArgs, 'id'>>;
  getMovies?: Resolver<ResolversTypes['PaginatedMoviesResult'], ParentType, ContextType, Partial<QueryGetMoviesArgs>>;
  getRecursiveComments?: Resolver<ResolversTypes['PaginatedRecursiveCommentsResult'], ParentType, ContextType, RequireFields<QueryGetRecursiveCommentsArgs, 'movieId'>>;
  getUser?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType, Partial<QueryGetUserArgs>>;
  getWatchlistItem?: Resolver<Maybe<ResolversTypes['WatchlistItem']>, ParentType, ContextType, RequireFields<QueryGetWatchlistItemArgs, 'movieId' | 'userId'>>;
  getWatchlistItems?: Resolver<ResolversTypes['PaginatedWatchlistItemsResult'], ParentType, ContextType, RequireFields<QueryGetWatchlistItemsArgs, 'userId'>>;
  randomMovie?: Resolver<ResolversTypes['Movie'], ParentType, ContextType>;
  searchMovies?: Resolver<ResolversTypes['PaginatedSearchResult'], ParentType, ContextType, RequireFields<QuerySearchMoviesArgs, 'query'>>;
}>;

export type RecursiveCommentResolvers<ContextType = any, ParentType extends ResolversParentTypes['RecursiveComment'] = ResolversParentTypes['RecursiveComment']> = ResolversObject<{
  content?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  deletedAt?: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>;
  depth?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  hasDownvoted?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  hasUpvoted?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  movieId?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  parentId?: Resolver<Maybe<ResolversTypes['ID']>, ParentType, ContextType>;
  totalComments?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  updatedAt?: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>;
  user?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>;
  userId?: Resolver<Maybe<ResolversTypes['ID']>, ParentType, ContextType>;
  voteRatio?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
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
  createdAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  email?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  firstName?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  lastName?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  updatedAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type WatchlistItemResolvers<ContextType = any, ParentType extends ResolversParentTypes['WatchlistItem'] = ResolversParentTypes['WatchlistItem']> = ResolversObject<{
  createdAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  label?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  movie?: Resolver<ResolversTypes['Movie'], ParentType, ContextType>;
  movieId?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  updatedAt?: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>;
  userId?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type Resolvers<ContextType = any> = ResolversObject<{
  Comment?: CommentResolvers<ContextType>;
  CommentVote?: CommentVoteResolvers<ContextType>;
  Creator?: CreatorResolvers<ContextType>;
  DateTime?: GraphQLScalarType;
  Genre?: GenreResolvers<ContextType>;
  Movie?: MovieResolvers<ContextType>;
  Mutation?: MutationResolvers<ContextType>;
  PaginatedMoviesResult?: PaginatedMoviesResultResolvers<ContextType>;
  PaginatedRecursiveCommentsResult?: PaginatedRecursiveCommentsResultResolvers<ContextType>;
  PaginatedSearchResult?: PaginatedSearchResultResolvers<ContextType>;
  PaginatedWatchlistItemsResult?: PaginatedWatchlistItemsResultResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  RecursiveComment?: RecursiveCommentResolvers<ContextType>;
  SearchMovie?: SearchMovieResolvers<ContextType>;
  Star?: StarResolvers<ContextType>;
  Upload?: GraphQLScalarType;
  User?: UserResolvers<ContextType>;
  WatchlistItem?: WatchlistItemResolvers<ContextType>;
}>;

