import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ApolloProvider } from "@apollo/client";

import HomePage from "./pages/HomePage";
import { Layout } from "./components/layouts/Layout";
import SignUpPage from "./pages/SignUpPage";
import SignInPage from "./pages/SignInPage";
import { AuthProvider } from "./lib/context/authContext";
import { NuqsAdapter } from "nuqs/adapters/react";

import ProfilePage from "./pages/ProfilePage";
import MoviePage from "./pages/MoviePage";
import DiscoverPage from "./pages/DiscoverPage";
import { apolloClient } from "./lib/graphql/apolloClient";
import FavoritePage from "./pages/FavoritePage";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter basename="/project2/">
        <NuqsAdapter>
          <ApolloProvider client={apolloClient}>
            <Routes>
              <Route path="/" element={<Layout />}>
                <Route index element={<HomePage />} />
                <Route path="/signup" element={<SignUpPage />} />
                <Route path="/signin" element={<SignInPage />} />
                <Route path="/discover" element={<DiscoverPage />} />
                <Route path="/profile/:userId" element={<ProfilePage />} />
                <Route path="/movie/:movieId" element={<MoviePage />} />
                <Route path="/FavoritePage" element={<FavoritePage />} />
              </Route>
            </Routes>
          </ApolloProvider>
        </NuqsAdapter>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
