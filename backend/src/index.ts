import { ApolloServer, type BaseContext } from "@apollo/server";
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath, format } from "node:url";
import cookie from "cookie";
import { validateSessionToken } from "./auth/session.js";
import type { MyContext, RemappedMutation, RemappedQuery } from "./types.js";
import { setSessionTokenCookie } from "./auth/utils.js";

import type { AddressInfo, ListenOptions } from "node:net";
import type { Express } from "express";
import { createServer, type Server } from "node:http";
import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer";
import { expressMiddleware } from "@apollo/server/express4";
import type { StartStandaloneServerOptions } from "@apollo/server/standalone";
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

const typeDefs = readFileSync(
  join(dirname(fileURLToPath(import.meta.url)), "schema.graphql"),
  "utf8",
);

const resolvers: {
  Query: RemappedQuery;
  Mutation: RemappedMutation;
  Date: GraphQLScalarType;
} = {
  Query: {
    getMovies,
    getMovie,
    getUser,
    randomMovie,
    searchMovies,
  },
  Mutation: {
    signUp,
    signIn,
    signOut,
  },
  Date: dateScalar,
};

const server = new ApolloServer<MyContext>({
  typeDefs,
  resolvers,
  formatError: (err) => {
    console.error(err);
    return err;
  },
});

// Copied from apollo source code
export function urlForHttpServer(httpServer: Server): string {
  const { address, port } = httpServer.address() as AddressInfo;

  const hostname = address === "" || address === "::" ? "localhost" : address;

  return format({
    protocol: "http",
    hostname,
    port,
    pathname: "/",
  });
}

// Copied from apollo source code with minor changes to allow for cors
export async function startStandaloneServer<TContext extends BaseContext>(
  server: ApolloServer<TContext>,
  options?: StartStandaloneServerOptions<TContext> & {
    listen?: ListenOptions;
  } & { cors?: { origin: string[]; credentials: boolean } },
): Promise<{ url: string }> {
  const app: Express = express();
  const httpServer: Server = createServer(app);

  server.addPlugin(
    ApolloServerPluginDrainHttpServer({ httpServer: httpServer }),
  );

  await server.start();

  const context = options?.context ?? (async () => ({}) as TContext);
  app.use(
    cors(options?.cors),
    express.json({ limit: "50mb" }),
    expressMiddleware(server, { context }),
  );

  const listenOptions = options?.listen ?? { port: 3001 };
  // Wait for server to start listening
  await new Promise<void>((resolve) => {
    httpServer.listen(listenOptions, resolve);
  });

  return { url: urlForHttpServer(httpServer) };
}

const { url } = await startStandaloneServer(server, {
  listen: { host: "0.0.0.0", port: 3001 },
  cors: {
    origin: ["http://localhost:5173", "http://it2810-21.idi.ntnu.no"],
    credentials: true,
  },
  context: async ({ req, res }) => {
    const cookies = req.headers.cookie ? cookie.parse(req.headers.cookie) : {};
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
});

console.log(`🚀  Server ready at: ${url}`);
