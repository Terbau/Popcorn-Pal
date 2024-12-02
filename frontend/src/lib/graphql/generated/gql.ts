/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 * Learn more about it here: https://the-guild.dev/graphql/codegen/plugins/presets/preset-client#reducing-bundle-size
 */
const documents = {
    "\n  mutation SignOut {\n    signOut\n  }\n": types.SignOutDocument,
    "\n  mutation SignIn($input: SignInInput!) {\n    signIn(input: $input) {\n      id\n      email\n      firstName\n      lastName\n    }\n  }\n": types.SignInDocument,
    "\n  mutation SignUp($input: SignUpInput!) {\n    signUp(input: $input) {\n      id\n      email\n      firstName\n      lastName\n    }\n  }\n": types.SignUpDocument,
    "\n  mutation CreateComment($input: CreateCommentInput!) {\n    createComment(input: $input) {\n      id\n      userId\n      movieId\n      content\n      createdAt\n      updatedAt\n      deletedAt\n      parentId\n    }\n  }  \n": types.CreateCommentDocument,
    "\n  mutation UpdateComment($id: ID!, $input: UpdateCommentInput!) {\n    updateComment(id: $id, input: $input) {\n      id\n      userId\n      movieId\n      content\n      createdAt\n      updatedAt\n      deletedAt\n      parentId\n    }\n  }\n": types.UpdateCommentDocument,
    "\n  mutation DeleteComment($id: ID!) {\n    deleteComment(id: $id) {\n      id\n      userId\n      movieId\n      content\n      createdAt\n      updatedAt\n      deletedAt\n      parentId\n    }\n  }\n": types.DeleteCommentDocument,
    "\n  mutation UpsertCommentVote($commentId: ID!, $input: UpsertCommentVoteInput!) {\n    upsertCommentVote(commentId: $commentId, input: $input) {\n      commentId\n      userId\n      type\n      createdAt\n      updatedAt\n    }\n  }\n": types.UpsertCommentVoteDocument,
    "\n  mutation DeleteCommentVote($commentId: ID!) {\n    deleteCommentVote(commentId: $commentId)\n  }\n": types.DeleteCommentVoteDocument,
    "\n  mutation UpdateProfile($input: UpdateUserInput!) {\n    updateUser(input: $input) {\n      id\n      email\n      firstName\n      lastName\n      avatarUrl\n      createdAt\n      updatedAt\n    }\n  }\n": types.UpdateProfileDocument,
    "\n  query GetRecursiveComments(\n    $movieId: ID!\n    $parentId: ID\n    $limitAtDepth: Int\n    $maxDepth: Int\n    $page: Int\n    $pageSize: Int\n    $orderDirection: String\n  ) {\n    getComment(id: $parentId) {\n      id\n      userId\n      movieId\n      content\n      createdAt\n      updatedAt\n      deletedAt\n      parentId\n      depth\n      totalComments\n      user {\n        id\n        email\n        avatarUrl\n        firstName\n        lastName\n      }\n      voteRatio\n      hasUpvoted\n      hasDownvoted\n    }\n\n    getRecursiveComments(\n      movieId: $movieId\n      parentId: $parentId\n      limitAtDepth: $limitAtDepth\n      maxDepth: $maxDepth\n      page: $page\n      pageSize: $pageSize\n      orderDirection: $orderDirection\n    ) {\n      movieId\n      parentId\n      totalResults\n      results {\n        id\n        userId\n        movieId\n        content\n        createdAt\n        updatedAt\n        deletedAt\n        parentId\n        depth\n        totalComments\n        user {\n          id\n          email\n          avatarUrl\n          firstName\n          lastName\n        }\n        voteRatio\n        hasUpvoted\n        hasDownvoted\n      }\n    }\n  }\n": types.GetRecursiveCommentsDocument,
    "\n  query GetGenres {\n    getGenres {\n      id\n      name\n    }\n  }\n": types.GetGenresDocument,
    "\n  query GetMovies ($orderBy: String!, $orderDirection: String!, $page: Int!, $pageSize: Int!, $genres: [String!]) {\n    getMovies(orderBy: $orderBy, orderDirection: $orderDirection, page: $page, pageSize: $pageSize, genres: $genres) {\n      results {\n        id\n        title\n        plot\n        runtime\n        yearReleased\n        releasedAt\n        certificate\n        externalRating\n        externalMovieMeterRank\n        externalVotes\n        posterUrl\n        posterHeight\n        posterWidth\n        landscapePosterUrl\n        landscapePosterHeight\n        landscapePosterWidth\n        showcaseOnHomePage\n        createdAt\n        updatedAt\n        creators {\n          id\n          name\n        }\n        genres {\n          id\n          name\n        }\n        stars {\n          id\n          name\n        }\n      }\n      totalResults\n    }\n  }\n": types.GetMoviesDocument,
    "\n  query GetMovie ($id: ID!) {\n    getMovie(id: $id) {\n      id\n        title\n        plot\n        runtime\n        yearReleased\n        releasedAt\n        certificate\n        externalRating\n        externalMovieMeterRank\n        externalVotes\n        posterUrl\n        posterHeight\n        posterWidth\n        landscapePosterUrl\n        landscapePosterHeight\n        landscapePosterWidth\n        showcaseOnHomePage\n        createdAt\n        updatedAt\n        creators {\n          id\n          name\n        }\n        genres {\n          id\n          name\n        }\n        stars {\n          id\n          name\n        }\n    }\n  }\n": types.GetMovieDocument,
    "\n  query GetFeaturedMovies {\n    getFeaturedMovies {\n      id\n      title\n      yearReleased\n      externalRating\n      landscapePosterUrl\n      landscapePosterHeight\n      landscapePosterWidth\n    }\n  }\n": types.GetFeaturedMoviesDocument,
    "\n  query SearchMovies($query: String!, $page: Int!, $pageSize: Int!) {\n    searchMovies(query: $query, page: $page, pageSize: $pageSize) {\n      results {\n        id\n        title\n        yearReleased\n        posterUrl\n        posterHeight\n        posterWidth\n        externalRating\n        similarity\n      }\n      totalResults\n    }\n  }\n": types.SearchMoviesDocument,
    "\n  query randomMovie {\n    randomMovie {\n      id\n    }\n  }\n": types.RandomMovieDocument,
    "\n  query GetCurrentUser {\n    getUser {\n      id\n      email\n      firstName\n      lastName\n      avatarUrl\n      createdAt\n      updatedAt\n    }\n  }\n": types.GetCurrentUserDocument,
    "\n  query GetUser($id: ID!) {\n    getUser(id: $id) {\n      id\n      email\n      firstName\n      lastName\n      avatarUrl\n      createdAt\n      updatedAt\n    }\n  }\n": types.GetUserDocument,
};

/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = gql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function gql(source: string): unknown;

/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation SignOut {\n    signOut\n  }\n"): (typeof documents)["\n  mutation SignOut {\n    signOut\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation SignIn($input: SignInInput!) {\n    signIn(input: $input) {\n      id\n      email\n      firstName\n      lastName\n    }\n  }\n"): (typeof documents)["\n  mutation SignIn($input: SignInInput!) {\n    signIn(input: $input) {\n      id\n      email\n      firstName\n      lastName\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation SignUp($input: SignUpInput!) {\n    signUp(input: $input) {\n      id\n      email\n      firstName\n      lastName\n    }\n  }\n"): (typeof documents)["\n  mutation SignUp($input: SignUpInput!) {\n    signUp(input: $input) {\n      id\n      email\n      firstName\n      lastName\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation CreateComment($input: CreateCommentInput!) {\n    createComment(input: $input) {\n      id\n      userId\n      movieId\n      content\n      createdAt\n      updatedAt\n      deletedAt\n      parentId\n    }\n  }  \n"): (typeof documents)["\n  mutation CreateComment($input: CreateCommentInput!) {\n    createComment(input: $input) {\n      id\n      userId\n      movieId\n      content\n      createdAt\n      updatedAt\n      deletedAt\n      parentId\n    }\n  }  \n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation UpdateComment($id: ID!, $input: UpdateCommentInput!) {\n    updateComment(id: $id, input: $input) {\n      id\n      userId\n      movieId\n      content\n      createdAt\n      updatedAt\n      deletedAt\n      parentId\n    }\n  }\n"): (typeof documents)["\n  mutation UpdateComment($id: ID!, $input: UpdateCommentInput!) {\n    updateComment(id: $id, input: $input) {\n      id\n      userId\n      movieId\n      content\n      createdAt\n      updatedAt\n      deletedAt\n      parentId\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation DeleteComment($id: ID!) {\n    deleteComment(id: $id) {\n      id\n      userId\n      movieId\n      content\n      createdAt\n      updatedAt\n      deletedAt\n      parentId\n    }\n  }\n"): (typeof documents)["\n  mutation DeleteComment($id: ID!) {\n    deleteComment(id: $id) {\n      id\n      userId\n      movieId\n      content\n      createdAt\n      updatedAt\n      deletedAt\n      parentId\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation UpsertCommentVote($commentId: ID!, $input: UpsertCommentVoteInput!) {\n    upsertCommentVote(commentId: $commentId, input: $input) {\n      commentId\n      userId\n      type\n      createdAt\n      updatedAt\n    }\n  }\n"): (typeof documents)["\n  mutation UpsertCommentVote($commentId: ID!, $input: UpsertCommentVoteInput!) {\n    upsertCommentVote(commentId: $commentId, input: $input) {\n      commentId\n      userId\n      type\n      createdAt\n      updatedAt\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation DeleteCommentVote($commentId: ID!) {\n    deleteCommentVote(commentId: $commentId)\n  }\n"): (typeof documents)["\n  mutation DeleteCommentVote($commentId: ID!) {\n    deleteCommentVote(commentId: $commentId)\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation UpdateProfile($input: UpdateUserInput!) {\n    updateUser(input: $input) {\n      id\n      email\n      firstName\n      lastName\n      avatarUrl\n      createdAt\n      updatedAt\n    }\n  }\n"): (typeof documents)["\n  mutation UpdateProfile($input: UpdateUserInput!) {\n    updateUser(input: $input) {\n      id\n      email\n      firstName\n      lastName\n      avatarUrl\n      createdAt\n      updatedAt\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query GetRecursiveComments(\n    $movieId: ID!\n    $parentId: ID\n    $limitAtDepth: Int\n    $maxDepth: Int\n    $page: Int\n    $pageSize: Int\n    $orderDirection: String\n  ) {\n    getComment(id: $parentId) {\n      id\n      userId\n      movieId\n      content\n      createdAt\n      updatedAt\n      deletedAt\n      parentId\n      depth\n      totalComments\n      user {\n        id\n        email\n        avatarUrl\n        firstName\n        lastName\n      }\n      voteRatio\n      hasUpvoted\n      hasDownvoted\n    }\n\n    getRecursiveComments(\n      movieId: $movieId\n      parentId: $parentId\n      limitAtDepth: $limitAtDepth\n      maxDepth: $maxDepth\n      page: $page\n      pageSize: $pageSize\n      orderDirection: $orderDirection\n    ) {\n      movieId\n      parentId\n      totalResults\n      results {\n        id\n        userId\n        movieId\n        content\n        createdAt\n        updatedAt\n        deletedAt\n        parentId\n        depth\n        totalComments\n        user {\n          id\n          email\n          avatarUrl\n          firstName\n          lastName\n        }\n        voteRatio\n        hasUpvoted\n        hasDownvoted\n      }\n    }\n  }\n"): (typeof documents)["\n  query GetRecursiveComments(\n    $movieId: ID!\n    $parentId: ID\n    $limitAtDepth: Int\n    $maxDepth: Int\n    $page: Int\n    $pageSize: Int\n    $orderDirection: String\n  ) {\n    getComment(id: $parentId) {\n      id\n      userId\n      movieId\n      content\n      createdAt\n      updatedAt\n      deletedAt\n      parentId\n      depth\n      totalComments\n      user {\n        id\n        email\n        avatarUrl\n        firstName\n        lastName\n      }\n      voteRatio\n      hasUpvoted\n      hasDownvoted\n    }\n\n    getRecursiveComments(\n      movieId: $movieId\n      parentId: $parentId\n      limitAtDepth: $limitAtDepth\n      maxDepth: $maxDepth\n      page: $page\n      pageSize: $pageSize\n      orderDirection: $orderDirection\n    ) {\n      movieId\n      parentId\n      totalResults\n      results {\n        id\n        userId\n        movieId\n        content\n        createdAt\n        updatedAt\n        deletedAt\n        parentId\n        depth\n        totalComments\n        user {\n          id\n          email\n          avatarUrl\n          firstName\n          lastName\n        }\n        voteRatio\n        hasUpvoted\n        hasDownvoted\n      }\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query GetGenres {\n    getGenres {\n      id\n      name\n    }\n  }\n"): (typeof documents)["\n  query GetGenres {\n    getGenres {\n      id\n      name\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query GetMovies ($orderBy: String!, $orderDirection: String!, $page: Int!, $pageSize: Int!, $genres: [String!]) {\n    getMovies(orderBy: $orderBy, orderDirection: $orderDirection, page: $page, pageSize: $pageSize, genres: $genres) {\n      results {\n        id\n        title\n        plot\n        runtime\n        yearReleased\n        releasedAt\n        certificate\n        externalRating\n        externalMovieMeterRank\n        externalVotes\n        posterUrl\n        posterHeight\n        posterWidth\n        landscapePosterUrl\n        landscapePosterHeight\n        landscapePosterWidth\n        showcaseOnHomePage\n        createdAt\n        updatedAt\n        creators {\n          id\n          name\n        }\n        genres {\n          id\n          name\n        }\n        stars {\n          id\n          name\n        }\n      }\n      totalResults\n    }\n  }\n"): (typeof documents)["\n  query GetMovies ($orderBy: String!, $orderDirection: String!, $page: Int!, $pageSize: Int!, $genres: [String!]) {\n    getMovies(orderBy: $orderBy, orderDirection: $orderDirection, page: $page, pageSize: $pageSize, genres: $genres) {\n      results {\n        id\n        title\n        plot\n        runtime\n        yearReleased\n        releasedAt\n        certificate\n        externalRating\n        externalMovieMeterRank\n        externalVotes\n        posterUrl\n        posterHeight\n        posterWidth\n        landscapePosterUrl\n        landscapePosterHeight\n        landscapePosterWidth\n        showcaseOnHomePage\n        createdAt\n        updatedAt\n        creators {\n          id\n          name\n        }\n        genres {\n          id\n          name\n        }\n        stars {\n          id\n          name\n        }\n      }\n      totalResults\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query GetMovie ($id: ID!) {\n    getMovie(id: $id) {\n      id\n        title\n        plot\n        runtime\n        yearReleased\n        releasedAt\n        certificate\n        externalRating\n        externalMovieMeterRank\n        externalVotes\n        posterUrl\n        posterHeight\n        posterWidth\n        landscapePosterUrl\n        landscapePosterHeight\n        landscapePosterWidth\n        showcaseOnHomePage\n        createdAt\n        updatedAt\n        creators {\n          id\n          name\n        }\n        genres {\n          id\n          name\n        }\n        stars {\n          id\n          name\n        }\n    }\n  }\n"): (typeof documents)["\n  query GetMovie ($id: ID!) {\n    getMovie(id: $id) {\n      id\n        title\n        plot\n        runtime\n        yearReleased\n        releasedAt\n        certificate\n        externalRating\n        externalMovieMeterRank\n        externalVotes\n        posterUrl\n        posterHeight\n        posterWidth\n        landscapePosterUrl\n        landscapePosterHeight\n        landscapePosterWidth\n        showcaseOnHomePage\n        createdAt\n        updatedAt\n        creators {\n          id\n          name\n        }\n        genres {\n          id\n          name\n        }\n        stars {\n          id\n          name\n        }\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query GetFeaturedMovies {\n    getFeaturedMovies {\n      id\n      title\n      yearReleased\n      externalRating\n      landscapePosterUrl\n      landscapePosterHeight\n      landscapePosterWidth\n    }\n  }\n"): (typeof documents)["\n  query GetFeaturedMovies {\n    getFeaturedMovies {\n      id\n      title\n      yearReleased\n      externalRating\n      landscapePosterUrl\n      landscapePosterHeight\n      landscapePosterWidth\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query SearchMovies($query: String!, $page: Int!, $pageSize: Int!) {\n    searchMovies(query: $query, page: $page, pageSize: $pageSize) {\n      results {\n        id\n        title\n        yearReleased\n        posterUrl\n        posterHeight\n        posterWidth\n        externalRating\n        similarity\n      }\n      totalResults\n    }\n  }\n"): (typeof documents)["\n  query SearchMovies($query: String!, $page: Int!, $pageSize: Int!) {\n    searchMovies(query: $query, page: $page, pageSize: $pageSize) {\n      results {\n        id\n        title\n        yearReleased\n        posterUrl\n        posterHeight\n        posterWidth\n        externalRating\n        similarity\n      }\n      totalResults\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query randomMovie {\n    randomMovie {\n      id\n    }\n  }\n"): (typeof documents)["\n  query randomMovie {\n    randomMovie {\n      id\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query GetCurrentUser {\n    getUser {\n      id\n      email\n      firstName\n      lastName\n      avatarUrl\n      createdAt\n      updatedAt\n    }\n  }\n"): (typeof documents)["\n  query GetCurrentUser {\n    getUser {\n      id\n      email\n      firstName\n      lastName\n      avatarUrl\n      createdAt\n      updatedAt\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query GetUser($id: ID!) {\n    getUser(id: $id) {\n      id\n      email\n      firstName\n      lastName\n      avatarUrl\n      createdAt\n      updatedAt\n    }\n  }\n"): (typeof documents)["\n  query GetUser($id: ID!) {\n    getUser(id: $id) {\n      id\n      email\n      firstName\n      lastName\n      avatarUrl\n      createdAt\n      updatedAt\n    }\n  }\n"];

export function gql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;