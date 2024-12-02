import { type ClassValue, clsx } from "clsx";
import type { MutableRefObject, Ref, RefCallback } from "react";
import { twMerge } from "tailwind-merge";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

dayjs.extend(relativeTime);

export type NoUndefinedField<T> = {
  [P in keyof T]-?: NoUndefinedField<NonNullable<T[P]>>;
};

export type ArrayElement<ArrayType extends readonly unknown[]> =
  ArrayType extends readonly (infer ElementType)[] ? ElementType : never;

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function useCombinedRefs<T>(...refs: Ref<T>[]): RefCallback<T> {
  return (element: T) => {
    for (const ref of refs) {
      if (typeof ref === "function") {
        ref(element);
      } else if (ref) {
        (ref as MutableRefObject<T | null>).current = element;
      }
    }
  };
}

export const createInitials = (
  firstName?: string | null,
  lastName?: string | null,
): string => {
  const firstInitial = firstName?.charAt(0) ?? "";
  const lastInitial = lastName?.charAt(0) ?? "";
  return `${firstInitial}${lastInitial}`.toUpperCase();
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

export const formatRelativeTime = (date: Date): string => {
  const formattedString = dayjs(date).fromNow();
  return formattedString === "in a few seconds" ? "just now" : formattedString;
};
