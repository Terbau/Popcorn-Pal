import type { ImgHTMLAttributes } from "react";
import { cn, transformAndResizeImageUrl } from "../../../lib/utils";
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
  // Transform and resize the image URL in order to reduce the image size.
  // This is done to improve the performance of the application as well as to
  // minimize the environmental impact of serving large images.
  const transformedSrc = transformAndResizeImageUrl(src, 264);

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
        <img
          src={transformedSrc}
          alt={alt}
          className="h-full object-cover"
          {...props}
        />
      </div>
    </div>
  );
};
