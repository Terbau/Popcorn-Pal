import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { movies } from "./mock.js";
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const typeDefs = readFileSync(
  join(dirname(fileURLToPath(import.meta.url)), "schema.graphql"),
  "utf8",
);

const resolvers = {
  Query: {
    movies: () => movies,
    movie: (_, { id }) => movies.find((movie) => movie.id === id),
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

const { url } = await startStandaloneServer(server, {
  listen: { port: 4000 },
});

console.log(`🚀  Server ready at: ${url}`);
