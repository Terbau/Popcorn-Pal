import type { RemappedQuery } from "../../types";
import { fetchMovies } from "../../functions.js";
import { fetchMovieImages } from "../../imdb/index.js";
import { db } from "../../db/index.js";

export const getMovie: RemappedQuery["getMovie"] = async (_, { id }) => {
  const movies = await fetchMovies([id]);
  const movie = movies.at(0);

  if (!movie) {
    return null;
  }

  let landscapePosterValues = null;

  // If no landscapePosterUrl is set, try to fetch one and upsert it.
  if (movie.landscapePosterUrl === null) {
    const movieImages = await fetchMovieImages(movie.id);

    // The landscape images tend to be at the end of the array, therefore we
    // start from the end and iterate backwards. We first look for an image with
    // a width that is at least 1280 pixels and that has a ratio within a certain
    // threshold and a caption that matches a certain pattern. If none are found, we
    // look for an image with a ratio that is exactly 1920x1080, then look for one
    // that is 1280x720. If none are found, we take the image with the width to height
    // ratio.

    let imageWithCaptionMatch = null;
    let _1920x1080 = null;
    let _1280x720 = null;
    let imageWithBestRatio = null;

    for (let i = movieImages.length - 1; i >= 0; i--) {
      const image = movieImages[i];
      const width = image.node.width;
      const height = image.node.height;
      const ratio = width / height;

      if (
        width >= 1280 &&
        ratio > 1.7 &&
        ratio < 1.8 &&
        image.node.caption.plainText.toLowerCase() ===
          `${movie.title} (${movie.yearReleased})`.toLowerCase()
      ) {
        imageWithCaptionMatch = image;
        break;
      }

      if (width === 1920 && height === 1080) {
        _1920x1080 = image;
      }
      if (width === 1280 && height === 720) {
        _1280x720 = image;
      }

      const bestRatio = imageWithBestRatio
        ? imageWithBestRatio.node.width / imageWithBestRatio.node.height
        : Number.MIN_VALUE;
      if (ratio > bestRatio) {
        imageWithBestRatio = image;
      }
    }

    const landscapeImage =
      imageWithCaptionMatch ?? _1920x1080 ?? _1280x720 ?? imageWithBestRatio;

    if (landscapeImage) {
      landscapePosterValues = {
        landscapePosterUrl: landscapeImage?.node.url ?? null,
        landscapePosterWidth: landscapeImage?.node.width ?? null,
        landscapePosterHeight: landscapeImage?.node.height ?? null,
      };

      // No need to await this, we can do it in the background.
      db.updateTable("movie")
        .set({
          landscapePosterUrl: landscapeImage.node.url,
          landscapePosterWidth: landscapeImage.node.width,
          landscapePosterHeight: landscapeImage.node.height,
        })
        .where("id", "=", movie.id)
        .execute();
    }
  }

  return { ...movie, ...landscapePosterValues };
};
