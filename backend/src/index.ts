import { ApolloServer } from "@apollo/server";
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import cookie from "cookie";
import { validateSessionToken } from "./auth/session.js";
import type { MyContext, RemappedMutation, RemappedQuery } from "./types.js";
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
import { dateScalar } from "./resolvers/scalars/date.js";
import type { GraphQLScalarType } from "graphql";
import { getMovies } from "./resolvers/queries/getMovies.js";
import { getMovie } from "./resolvers/queries/getMovie.js";
import { updateUser } from "./resolvers/mutations/updateUser.js";
import { getFeaturedMovies } from "./resolvers/queries/getFeaturedMovies.js";
import { getUserMovieData } from "./resolvers/queries/getUserMovieData.js";
import { addFavoriteMovie } from "./resolvers/mutations/addFavoriteMovie.js";
import { deleteFavoriteMovie } from "./resolvers/mutations/deleteFavoriteMovie.js";

const FILE_UPLOAD_MAX_SIZE = 1 * 1024 * 1024;

const typeDefs = readFileSync(
  join(dirname(fileURLToPath(import.meta.url)), "schema.graphql"),
  "utf8"
);

const resolvers: {
  Upload: typeof GraphQLUpload;
  Query: RemappedQuery;
  Mutation: RemappedMutation;
  Date: GraphQLScalarType;
} = {
  Upload: GraphQLUpload,
  Query: {
    getMovies,
    getMovie,
    getFeaturedMovies,
    getUser,
    randomMovie,
    searchMovies,
    getUserMovieData,
  },
  Mutation: {
    signUp,
    signIn,
    signOut,
    updateUser,
    addFavoriteMovie,
    deleteFavoriteMovie,
  },
  Date: dateScalar,
};

const startServer = async () => {
  const app = express();
  const httpServer = createServer(app);

  const server = new ApolloServer<MyContext>({
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
    express.json({ limit: "50mb" })
  );

  await server.start();

  app.use(
    "/graphql",
    graphqlUploadExpress({ maxFileSize: FILE_UPLOAD_MAX_SIZE, maxFiles: 1 }),
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
            sessionValidationResult.session.expiresAt
          );
        }
        return { ...sessionValidationResult, res };
      },
    })
  );

  app.listen(3001, () => {
    console.log("🚀 Server ready at http://localhost:3001/graphql");
  });
};

startServer();
