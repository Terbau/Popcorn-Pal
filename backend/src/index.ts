import { ApolloServer } from "@apollo/server";
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import cookie from "cookie";
import { validateSessionToken } from "./auth/session.js";
import { setSessionTokenCookie } from "./auth/utils.js";

import { createServer } from "node:http";
import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer";
import { expressMiddleware } from "@apollo/server/express4";
import { GraphQLUpload, graphqlUploadExpress } from "graphql-upload-minimal";
import cors from "cors";
import express from "express";
import { getUser } from "./resolvers/queries/getUser.js";
import { randomMovie } from "./resolvers/queries/randomMovie.js";
import { signUp } from "./resolvers/mutations/signUp.js";
import { signIn } from "./resolvers/mutations/signIn.js";
import { signOut } from "./resolvers/mutations/signOut.js";
import { searchMovies } from "./resolvers/queries/searchMovies.js";
import type { GraphQLScalarType } from "graphql";
import { getMovies } from "./resolvers/queries/getMovies.js";
import { getMovie } from "./resolvers/queries/getMovie.js";
import { updateUser } from "./resolvers/mutations/updateUser.js";
import { getFeaturedMovies } from "./resolvers/queries/getFeaturedMovies.js";
import type { MutationResolvers, QueryResolvers } from "./generated/types.js";
import type { CustomContext } from "./types.js";
import { DateTimeResolver } from "graphql-scalars";
import { getGenres } from "./resolvers/queries/getGenres.js";
import { getRecursiveComments } from "./resolvers/queries/getRecursiveComments.js";
import { deleteComment } from "./resolvers/mutations/deleteComment.js";
import { updateComment } from "./resolvers/mutations/updateComment.js";
import { createComment } from "./resolvers/mutations/createComment.js";
import { getComment } from "./resolvers/queries/getComment.js";
import { upsertCommentVote } from "./resolvers/mutations/upsertCommentVote.js";
import { deleteCommentVote } from "./resolvers/mutations/deleteCommentVote.js";
import { getWatchlistItems } from "./resolvers/queries/getWatchlistItems.js";
import { createWatchlistItem } from "./resolvers/mutations/createWatchlistItem.js";
import { updateWatchlistItem } from "./resolvers/mutations/updateWatchlistItem.js";
import { deleteWatchlistItem } from "./resolvers/mutations/deleteWatchlistItem.js";
import { getWatchlistItem } from "./resolvers/queries/getWatchlistItem.js";
import { searchUsers } from "./resolvers/queries/searchUsers.js";
import { getFollowerInfo } from "./resolvers/queries/getFollowerInfo.js";
import { createFollow } from "./resolvers/mutations/createFollow.js";
import { deleteFollow } from "./resolvers/mutations/deleteFollow.js";

const FILE_UPLOAD_MAX_SIZE = 1 * 1024 * 1024;

const typeDefs = readFileSync(
  join(dirname(fileURLToPath(import.meta.url)), "schema.graphql"),
  "utf8",
);

const resolvers: {
  Upload: typeof GraphQLUpload;
  Query: QueryResolvers<CustomContext>;
  Mutation: MutationResolvers<CustomContext>;
  DateTime: GraphQLScalarType;
} = {
  DateTime: DateTimeResolver,
  Upload: GraphQLUpload,
  Query: {
    getMovies,
    getMovie,
    getFeaturedMovies,
    getUser,
    randomMovie,
    searchMovies,
    searchUsers,
    getGenres,
    getComment,
    getRecursiveComments,
    getWatchlistItems,
    getWatchlistItem,
    getFollowerInfo,
  },
  Mutation: {
    signUp,
    signIn,
    signOut,
    updateUser,
    createComment,
    updateComment,
    deleteComment,
    upsertCommentVote,
    deleteCommentVote,
    createWatchlistItem,
    updateWatchlistItem,
    deleteWatchlistItem,
    createFollow,
    deleteFollow,
  },
};

const startServer = async () => {
  const app = express();
  const httpServer = createServer(app);

  const server = new ApolloServer<CustomContext>({
    typeDefs,
    resolvers,
    formatError: (err) => {
      console.error(err);
      return err;
    },
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
  });

  app.use(
    cors({
      origin: ["http://localhost:5173", "http://it2810-21.idi.ntnu.no"],
      credentials: true,
    }),
    express.json({ limit: "50mb" }),
  );

  await server.start();

  app.use(
    "/graphql",
    graphqlUploadExpress({
      maxFileSize: FILE_UPLOAD_MAX_SIZE,
      maxFiles: 1,
    }),
    expressMiddleware(server, {
      context: async ({ req, res }) => {
        const cookies = req.headers.cookie
          ? cookie.parse(req.headers.cookie)
          : {};
        const token = cookies.session;

        if (!token) {
          return { session: null, user: null, res };
        }

        const sessionValidationResult = await validateSessionToken(token);

        if (sessionValidationResult.session) {
          setSessionTokenCookie(
            res,
            token,
            sessionValidationResult.session.expiresAt,
          );
        }
        return { ...sessionValidationResult, res };
      },
    }),
  );

  app.listen(3001, () => {
    console.log("🚀 Server ready at http://localhost:3001/graphql");
  });
};

startServer();
