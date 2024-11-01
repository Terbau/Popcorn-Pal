import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export type NoUndefinedField<T> = { [P in keyof T]-?: NoUndefinedField<NonNullable<T[P]>> };

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

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