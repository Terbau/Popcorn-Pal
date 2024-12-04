import {
  ApolloClient,
  ApolloLink,
  concat,
  InMemoryCache,
} from "@apollo/client";
import createUploadLink from "apollo-upload-client/createUploadLink.mjs";
import { sessionVar } from "../reactiveVars";

const uploadLink = createUploadLink({
  uri:
    import.meta.env.VITE_NODE_ENV === "development"
      ? "http://localhost:3001/graphql"
      : "http://it2810-21.idi.ntnu.no:3001/graphql",
  credentials: "include",
});

// Middleware to update sessionVar with the session cookie
const middleware = new ApolloLink((operation, forward) => {
  const operationName = operation.operationName;
  operation.setContext(({ headers = {} }) => ({
    headers: {
      ...headers,
      "x-apollo-operation-name": operationName,
    },
  }));
  return forward(operation).map((response) => {
    const cookies = document.cookie.split("; ");
    const sessionCookie = cookies.find((cookie) =>
      cookie.startsWith("session="),
    );

    const sessionValue = sessionCookie
      ? sessionCookie.split("=")[1]
      : undefined;

    sessionVar(sessionValue);

    return response;
  });
});

export const apolloClient = new ApolloClient({
  cache: new InMemoryCache({
    typePolicies: {
      PaginatedRecursiveCommentsResult: {
        keyFields: ["movieId", "parentId"],
        fields: {
          results: {
            merge(existing, incoming) {
              return [...(existing ?? []), ...incoming];
            },
          },
        },
      },
      PaginatedWatchlistItemsResult: {
        keyFields: ["userId", "genres", "labels", "orderBy", "orderDirection"],
        merge(existing, incoming) {
          return incoming;
        },
      },
      WatchlistItem: {
        keyFields: ["userId", "movieId"],
        fields: {
          label: {
            merge(_, incoming) {
              return incoming;
            },
          },
        },
      },
      Query: {
        fields: {
          searchMovies: {
            keyArgs: ["query"],
            // what to do when merging fetchMore data
            merge(existing, incoming) {
              return {
                ...incoming,
                movies: [...(existing?.results ?? []), ...incoming.results],
              };
            },
          },
          getRecursiveComments: {
            keyArgs: ["movieId", "parentId"],
            merge(_, incoming) {
              // Some weird behavior. Returning just incoming works...
              return incoming;
            },
          },
        },
      },
      Movie: {
        fields: {
          genres: {
            merge(_, incoming) {
              return incoming;
            },
          },
        },
      },
    },
  }),
  link: concat(middleware, uploadLink),
});
