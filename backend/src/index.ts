import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { movies } from "./mock.js";

const typeDefs = `#graphql
  type Comment {
    id: Int
    user: String
    content: String
    date: String
  }

  type Movie {
    id: Int
    title: String
    description: String
    releaseDate: String
    genres: [String]
    rating: Float
    director: String
    cast: [String]
    runtime: String
    posterUrl: String
    comments: [Comment]
  }
  
  type Query {
    movies: [Movie]
    movie(id: Int!): Movie
  }
`;

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
