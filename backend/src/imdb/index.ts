import type {
  ImdbImageLookupImageData,
  ImdbLookupResult,
  ImdbRawLookupResult,
  ImdbRawSearchResult,
  ImdbSearchResultEntry,
} from "./types";
import { convertMovie, convertSeries } from "./utils.js";

/**
 * Fetches the IMDb data for the given IDs
 * @param ids - The IMDb IDs to fetch
 * @returns The IMDb data
 */
export async function getItemsByIds(ids: string[]): Promise<ImdbLookupResult> {
  if (ids.length === 0) {
    return {};
  }

  const response = await fetch(
    `https://www.imdb.com/title/data?ids=${ids.join(",")}`,
    {
      headers: {
        "Accept-Language": "en-US",
      },
    },
  );

  const data = (await response.json()) as ImdbRawLookupResult;

  const newItems: ImdbLookupResult = {};
  for (const obj of Object.values(data)) {
    if (obj.title.type === "featureFilm") {
      const movie = convertMovie(obj);
      newItems[movie.id] = movie;
    } else if (obj.title.type === "series") {
      const series = convertSeries(obj);
      newItems[series.id] = series;
    }
  }

  return newItems;
}

/**
 * Searches IMDb for the given query
 * @param query - The query to search for
 * @returns The search results
 */
export async function searchImdb(
  query: string,
): Promise<ImdbSearchResultEntry[]> {
  const response = await fetch(
    `https://v3.sg.media-imdb.com/suggestion/x/${query}.json`,
    {
      headers: {
        "Accept-Language": "en-US",
      },
    },
  );

  const data = (await response.json()) as ImdbRawSearchResult;
  const entries: ImdbSearchResultEntry[] = data.d
    .filter((entry) => entry.qid && ["movie", "tvSeries"].includes(entry.qid))
    .map((entry) => ({
      id: entry.id,
      title: entry.l,
      type: entry.qid ?? "movie",
      yearReleased: entry.y,
      yearsRunning: entry.yr,
      image: entry.i ?? null,
      rank: entry.rank,
      higlightedActors: entry.s,
    }));

  return entries;
}

/**
 * Fetches the images for the given movie ID
 * @param movieId - The IMDb ID of the movie
 * @returns The images
 */
export async function fetchMovieImages(
  movieId: string,
): Promise<ImdbImageLookupImageData[]> {
  const response = await fetch(`https://imdb.com/title/${movieId}/mediaindex/`);

  const rawText = await response.text();
  const matches = rawText.match(
    /"all_images":{"total":(\d+),"pageInfo":{"hasNextPage":(\w+),"endCursor":"(\w+=*)","__typename":"PageInfo"},"edges":(\[.*?\]),"facets"/,
  );
  if (!matches) {
    throw new Error("Failed to parse images");
  }

  const total = Number.parseInt(matches[1]);
  const hasNextPage = matches[2] === "true";
  const endCursor = matches[3];
  let edges = JSON.parse(matches[4]);

  if (hasNextPage) {
    // The page always includes 50 images at max
    const imagesToFetch = total - 50;

    const params = new URLSearchParams({
      operationName: "TitleMediaIndexPagination",
      variables: JSON.stringify({
        after: endCursor,
        const: movieId,
        filter: { galleryConstraints: {}, nameConstraints: {} },
        first: imagesToFetch,
        firstFacets: 0,
        inIframeLinkContext: {
          business: "consumer",
          isInIframe: true,
          returnUrl: "https://www.imdb.com/close_me",
        },
        locale: "en-US",
        notInIframeLinkContext: {
          business: "consumer",
          isInIframe: false,
          returnUrl: "https://www.imdb.com/",
        },
        originalTitleText: false,
      }),
      extensions: JSON.stringify({
        persistedQuery: {
          sha256Hash:
            "e03a2b4d4986f47d6e3e5ead8721f7441c2557c167c52d05302bbb93bab47c3d",
          version: 1,
        },
      }),
    });
    const newResponse = await fetch(
      `https://caching.graphql.imdb.com/?${params}`,
      {
        headers: {
          "Content-Type": "application/json",
        },
      },
    );
    const newData = await newResponse.json();
    const newEdges = newData.data.title.images.edges;

    // add newEdges to edges
    edges = edges.concat(newEdges);
  }

  return edges;
}
