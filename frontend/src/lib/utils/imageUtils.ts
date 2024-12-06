// Tranforms image URLs to have a specific width and height
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

// Transforms image URLs to have a specific width and height and also resizes
// the image to fit within the target width and height.
export const transformAndResizeImageUrl = (
  url: string,
  targetWidth: number,
  width?: number,
  height?: number,
): string => {
  let oldWidth = width;
  let oldHeight = height;

  const found = url.match(/_UX\d+_.*,\d,(\d+),(\d+)/);
  if (found) {
    oldWidth = Number.parseInt(found[1], 10);
    oldHeight = Number.parseInt(found[2], 10);
  }

  if (!oldWidth || !oldHeight) {
    throw new Error("Could not find width and height");
  }

  const targetHeight = Math.round((oldHeight / oldWidth) * targetWidth);
  return transformImageUrl(url, targetWidth, targetHeight);
};

// Creates a srcset attribute value for an image URL with the given width and
// height. The targetWidths array should be a list of widths that the image
// should be resized to.
export const createSrcSet = (
  url: string,
  width: number,
  height: number,
  targetWidths: number[],
): string => {
  const srcSet = targetWidths.map(
    (targetWidth) =>
      `${transformAndResizeImageUrl(
        url,
        targetWidth,
        width,
        height,
      )} ${targetWidth}w`,
  );
  return srcSet.join(", ");
};
