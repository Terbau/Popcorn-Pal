import { HashRouter, Route, Routes } from "react-router-dom";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";

import HomePage from "./pages/HomePage";
import MovieDetailPage from "./pages/MoviePage";
import { Layout } from "./components/layouts/Layout";

const client = new ApolloClient({
  uri: "http://localhost:4000",
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client={client}>
      <HashRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<HomePage />} />
            <Route path="/movie/:movieId" element={<MovieDetailPage />} />
          </Route>
        </Routes>
      </HashRouter>
    </ApolloProvider>
  );
}

export default App;
