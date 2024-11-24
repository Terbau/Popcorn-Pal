export interface ImdbImageLookupImageData {
  position: number;
  node: {
    id: string;
    caption: {
      plainText: string;
    }
    height: number;
    width: number;
    url: string;
  }
}

export interface ImdbImageData {
  height: number;
  imageUrl: string;
  srcset: string;
  width: number;
}

export interface ImdbPosterData {
  height: number;
  url: string;
  srcset: string;
  width: number;
}

export interface ImdbRawSearchResult {
  d: ImdbRawSearchResultEntry[];
  q: string;
  v: number;
}

export interface ImdbRawSearchResultEntry {
  i?: ImdbImageData; // image data
  id: string; // imdb id
  l: string; // title
  q?: string; // some title? ("TV Series", "feature")
  qid?: "tvSeries" | "movie"; // type
  rank?: number; // rank??
  s?: string; // highlighted actors
  y?: number; // year released
  yr?: string; // years a tvseries was running [only included after series end] (e.g. "2020-2023")
}

export interface ImdbSearchResultEntry {
  id: string;
  title: string;
  type: "tvSeries" | "movie";
  yearReleased?: number;
  yearsRunning?: string;
  image: ImdbImageData | null;
  rank?: number;
  highlightedActors?: string;
}

export interface ImdbSearchResultMovie extends ImdbSearchResultEntry {
  type: "movie";
}

export interface ImdbSearchResultTVSeries extends ImdbSearchResultEntry {
  type: "tvSeries";
}

export interface ImdbRawLookupResult {
  [id: string]: ImdbRawLookupResultEntry;
}

export interface ImdbRawLookupResultEntry {
  ribbon: { inWL: boolean; tconst: string };
  starbar: {
    aggregate: number;
    csrfToken: string;
    id: string;
    rating: number;
    votes: number;
  };
  title: {
    credits: {
      star?: { href: string; name: string }[];
      director?: { href: string; name: string }[];
      creator?: { href: string; name: string }[];
    }
    id: string;
    metadata: {
      certificate: string;
      genres: string[];
      release: number;
      runtime: number;
      numberOfEpisodes?: number;
    },
    movieMeterCurrentRank: number;
    plot: string;
    poster: ImdbPosterData;
    primary: {
      href: string;
      title: string;
      year: string[];
    }
    ratings: {
      canVote: boolean;
      metascore: number;
      rating: number;
      votes: number;
    }
    type: string;
  }
}

export interface ImdbCreator {
  id: string;
  name: string;
}

export interface ImdbStar {
  id: string;
  name: string;
}

export interface ImdbStats {
  starRating: number;
  movieMeterRank: number;
  votes: number;
}

export interface ImdbItem {
  id: string;
  title: string;
  plot: string;
  runtime?: number;
  yearReleased: number | null;
  yearEnded: number | null;
  releasedAt: Date | null;
  numberOfEpisodes: number;
  genres: string[];
  certificate: string;
  stats: ImdbStats;
  creators: ImdbCreator[];
  stars: ImdbStar[];
  poster: ImdbPosterData | null;
  type: "movie" | "series";
}

export interface ImdbLookupResult {
  [id: string]: ImdbItem;
}

