import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ApolloProvider } from "@apollo/client";

import HomePage from "./pages/HomePage";
import { Layout } from "./components/layouts/Layout";
import SignUpPage from "./pages/SignUpPage";
import SignInPage from "./pages/SignInPage";
import { AuthProvider } from "./lib/context/authContext";
import { NuqsAdapter } from "nuqs/adapters/react";
import { Theme } from "@radix-ui/themes";

import ProfilePage from "./pages/ProfilePage";
import MoviePage from "./pages/MoviePage";
import { apolloClient } from "./lib/graphql/apolloClient";
import DiscoverPage from "./pages/DiscoverPage";
import WatchlistPage from "./pages/WatchlistPage";
import ForYouPage from "./pages/ForYouPage";
import { createContext, Dispatch, SetStateAction, useState } from "react";

type Theme = "dark" | "light";
export const ThemeContext = createContext<{
  theme: Theme;
  setTheme: Dispatch<SetStateAction<Theme>>;
} | null>(null);
function App() {
  const [theme, setTheme] = useState<"dark" | "light">("dark");
  return (
    <div className={`${theme === "dark" && "dark"}`}>
      <ThemeContext.Provider value={{ theme, setTheme }}>
        <Theme>
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
                      <Route path="/foryou" element={<ForYouPage />} />
                      <Route
                        path="/profile/:userId"
                        element={<ProfilePage />}
                      />
                      <Route path="/movie/:movieId" element={<MoviePage />} />
                      <Route
                        path="/watchlist/:userId"
                        element={<WatchlistPage />}
                      />
                    </Route>
                  </Routes>
                </ApolloProvider>
              </NuqsAdapter>
            </BrowserRouter>
          </AuthProvider>
        </Theme>
      </ThemeContext.Provider>
    </div>
  );
}

export default App;
