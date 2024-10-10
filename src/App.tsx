import { HashRouter, Route, Routes } from "react-router-dom";
import ApolloClient, {
  InMemoryCache,
  type NormalizedCacheObject,
} from "apollo-boost";
import { ApolloProvider as BeforeApolloProvider } from "@apollo/react-hooks";
import HomePage from "./pages/HomePage";
import MovieDetailPage from "./pages/MovieDetailPage";

const cache = new InMemoryCache({});

const client = new ApolloClient<NormalizedCacheObject>({
  cache: cache,
  clientState: {
    defaults: {},
  },
});

// This is a workaround for typescript screaming at our faces because of apollo boost
// not configuring types properly
// biome-ignore lint/suspicious/noExplicitAny: <hopelessly bad typescript support from apollo boost>
const ApolloProvider = BeforeApolloProvider as any;

function App() {
  return (
    <ApolloProvider client={client}>
      <HashRouter>
        <Routes>
          <Route path="/" Component={HomePage} />
          <Route path="/movie/:movieId" Component={MovieDetailPage} />
        </Routes>
      </HashRouter>
    </ApolloProvider>
  );
}

export default App;
