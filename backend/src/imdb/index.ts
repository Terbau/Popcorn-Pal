import type {
  ImdbLookupResult,
  ImdbRawLookupResult,
  ImdbRawSearchResult,
  ImdbSearchResultEntry,
} from "./types";
import { convertMovie, convertSeries } from "./utils";

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
