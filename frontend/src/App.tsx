import { HashRouter, Route, Routes } from "react-router-dom";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  HttpLink,
  ApolloLink,
  concat,
} from "@apollo/client";

import HomePage from "./pages/HomePage";
import MovieDetailPage from "./pages/MoviePage";
import { Layout } from "./components/layouts/Layout";
import SignUpPage from "./pages/SignUpPage";
import SignInPage from "./pages/SignInPage";
import { AuthProvider } from "./lib/context/authContext";

import { sessionVar } from "./lib/reactiveVars";

const link = new HttpLink({
  // check if in production
  uri:
    import.meta.env.VITE_NODE_ENV === "development"
      ? "http://localhost:3001"
      : "http://it2810-21.idi.ntnu.no:3001",
  credentials: "include",
});

// Middleware to update sessionVar with the session cookie
const middleware = new ApolloLink((operation, forward) => {
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

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: concat(middleware, link),
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
              <Route path="/movie/:movieId" element={<MovieDetailPage />} />
            </Route>
          </Routes>
        </ApolloProvider>
      </HashRouter>
    </AuthProvider>
  );
}

export default App;
