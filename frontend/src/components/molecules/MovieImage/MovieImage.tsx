import type { ImgHTMLAttributes } from "react";
import { cn } from "../../../lib/utils";

interface MovieImageProps extends ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
}

export const MovieImage = ({
  src,
  alt,
  className,
  ...props
}: MovieImageProps) => {
  return (
    <div
      className={cn(
        "h-60 aspect-[2/3] shrink-0 hover:scale-105 duration-300 rounded-lg overflow-hidden",
        className,
      )}
    >
      {/* biome-ignore lint/a11y/useAltText: <alt clearly defined> */}
      <img src={src} alt={alt} className="h-full object-cover" {...props} />
    </div>
  );
};
