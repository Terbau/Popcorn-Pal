import type { ImgHTMLAttributes } from "react";
import { cn } from "../../../lib/utils";
import { Badge, type BadgeProps } from "../../atoms/Badge/Badge";

interface MovieImageProps extends ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  badgeProps?: BadgeProps;
}

export const MovieImage = ({
  src,
  alt,
  badgeProps,
  className,
  ...props
}: MovieImageProps) => {
  return (
    <div
      className={cn(
        "h-44 md:h-60 aspect-[2/3] shrink-0 hover:scale-105 duration-300 rounded-lg relative",
        className,
      )}
    >
      {badgeProps && (
        <Badge {...badgeProps} className="absolute -top-3 -right-4" />
      )}
      <div className="overflow-hidden rounded-lg h-full">
        {/* biome-ignore lint/a11y/useAltText: <alt clearly defined> */}
        <img src={src} alt={alt} className="h-full object-cover" {...props} />
      </div>
    </div>
  );
};
