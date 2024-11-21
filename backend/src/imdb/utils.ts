import type {
  ImdbImageData,
  ImdbItem,
  ImdbPosterData,
  ImdbRawLookupResultEntry,
  ImdbRawSearchResultEntry,
  ImdbSearchResultEntry,
} from "./types";

const months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

export const parseDate = (date: string): Date => {
  // Format "01 Jan 2000"
  const [day, month, year] = date.split(" ");
  return new Date(
    Number.parseInt(year),
    months.indexOf(month),
    Number.parseInt(day),
  );
};

export const transformImageUrl = (
  url: string,
  width: number,
  height: number,
): string => {
  return url.replace(
    /_+V1_.*\.(\w+)$/,
    `_V1_QL75_UX${width}_CR0,0,${width},${height}_.$1`,
  );
};

export const transformAndResizeImageUrl = (
  url: string,
  width: number,
  height: number,
  targetWidth: number,
): string => {
  const targetHeight = Math.round((height / width) * targetWidth);
  return transformImageUrl(url, targetWidth, targetHeight);
};

export const createSrcSet = (
  url: string,
  width: number,
  height: number,
  targetWidths: number[],
): string => {
  const srcSet = targetWidths.map(
    (targetWidth) =>
      `${transformAndResizeImageUrl(url, width, height, targetWidth)} ${targetWidth}w`,
  );
  return srcSet.join(", ");
};

export const convertFromRawEntry = (
  raw: ImdbRawSearchResultEntry,
): ImdbSearchResultEntry => {
  return {
    id: raw.id,
    title: raw.l,
    type: raw.qid ?? "movie",
    yearReleased: raw.y,
    yearsRunning: raw.yr,
    image: convertImage(raw.i),
    rank: raw.rank,
    highlightedActors: raw.s,
  };
};

const convertPoster = (poster?: ImdbPosterData): ImdbPosterData | null => {
  if (poster) {
    return {
      height: poster.height,
      url: transformImageUrl(poster.url, poster.width, poster.height),
      srcset: createSrcSet(
        poster.url,
        poster.width,
        poster.height,
        [190, 285, 380],
      ),
      width: poster.width,
    };
  }
  return null;
};

const convertImage = (image?: ImdbImageData): ImdbImageData | null => {
  if (image) {
    return {
      height: image.height,
      imageUrl: transformImageUrl(image.imageUrl, image.width, image.height),
      srcset: createSrcSet(
        image.imageUrl,
        image.width,
        image.height,
        [190, 285, 380],
      ),
      width: image.width,
    };
  }
  return null;
};

export const convertMovie = (obj: ImdbRawLookupResultEntry): ImdbItem => {
  const [yearReleased, yearEnded] = obj.title.primary.year ?? [null, null];
  const releasedAt = obj.title.metadata.release;

  const movie: ImdbItem = {
    id: obj.title.id,
    title: obj.title.primary.title,
    plot: obj.title.plot,
    runtime: obj.title.metadata.runtime,
    yearReleased: yearReleased ? Number.parseInt(yearReleased) : null,
    yearEnded: yearEnded ? Number.parseInt(yearEnded) : null,
    releasedAt: releasedAt ? new Date(obj.title.metadata.release) : null,
    genres: obj.title.metadata.genres,
    numberOfEpisodes: 1,
    certificate: obj.title.metadata.certificate,
    stats: {
      starRating: obj.starbar.aggregate,
      movieMeterRank: obj.title.movieMeterCurrentRank,
      votes: obj.starbar.votes,
    },
    creators:
      obj.title.credits.director?.map((d) => ({
        id: d.href.split("/")[2],
        name: d.name,
      })) ?? [],
    stars:
      obj.title.credits.star?.map((s) => ({
        id: s.href.split("/")[2],
        name: s.name,
      })) ?? [],
    poster: convertPoster(obj.title.poster),
    type: "movie",
  };

  return movie;
};

export const convertSeries = (obj: ImdbRawLookupResultEntry): ImdbItem => {
  const [yearReleased, yearEnded] = obj.title.primary.year;

  const series: ImdbItem = {
    id: obj.title.id,
    title: obj.title.primary.title,
    plot: obj.title.plot,
    runtime: obj.title.metadata.runtime,
    yearReleased: yearReleased ? Number.parseInt(yearReleased) : null,
    yearEnded: yearEnded ? Number.parseInt(yearEnded) : null,
    releasedAt: new Date(obj.title.metadata.release),
    numberOfEpisodes: obj.title.metadata.numberOfEpisodes ?? 0,
    genres: obj.title.metadata.genres,
    certificate: obj.title.metadata.certificate,
    stats: {
      starRating: obj.starbar.aggregate,
      movieMeterRank: obj.title.movieMeterCurrentRank,
      votes: obj.starbar.votes,
    },
    creators:
      obj.title.credits.creator?.map((d) => ({
        id: d.href.split("/")[2],
        name: d.name,
      })) ?? [],
    stars:
      obj.title.credits.star?.map((s) => ({
        id: s.href.split("/")[2],
        name: s.name,
      })) ?? [],
    poster: convertPoster(obj.title.poster),
    type: "series",
  };

  return series;
};
