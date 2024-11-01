import { HashRouter, Route, Routes } from "react-router-dom";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  ApolloLink,
  concat,
} from "@apollo/client";
import createUploadLink from "apollo-upload-client/createUploadLink.mjs";

import HomePage from "./pages/HomePage";
import { Layout } from "./components/layouts/Layout";
import SignUpPage from "./pages/SignUpPage";
import SignInPage from "./pages/SignInPage";
import { AuthProvider } from "./lib/context/authContext";
import MyListPage from "./pages/MyListPage";

import { sessionVar } from "./lib/reactiveVars";
import ProfilePage from "./pages/ProfilePage";
import MoviePage from "./pages/MoviePage";

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
      cookie.startsWith("session=")
    );

    const sessionValue = sessionCookie
      ? sessionCookie.split("=")[1]
      : undefined;

    sessionVar(sessionValue);

    return response;
  });
});

const client = new ApolloClient({
  cache: new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
          searchMovies: {
            keyArgs: ["query"],
            // what to do when merging fetchMore data
            merge(existing, incoming) {
              return {
                ...incoming,
                movies: [...(existing?.movies ?? []), ...incoming.movies],
              };
            },
          },
        },
      },
    },
  }),
  link: concat(middleware, uploadLink),
});

function App() {
  return (
    <AuthProvider>
      <HashRouter>
        <ApolloProvider client={client}>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<HomePage />} />
              <Route path="/signup" element={<SignUpPage />} />
              <Route path="/signin" element={<SignInPage />} />
              <Route path="/profile/:userId" element={<ProfilePage />} />
              <Route path="/movie/:movieId" element={<MoviePage />} />
              <Route path="/mypage/:userId" element={<MyListPage />} />
            </Route>
          </Routes>
        </ApolloProvider>
      </HashRouter>
    </AuthProvider>
  );
}

export default App;
